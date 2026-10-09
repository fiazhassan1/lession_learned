import importlib.util
import json
import os
from pathlib import Path
import re
import tempfile
import unittest

REPO = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("policy_check", REPO / "scripts/verify_agent_policy.py")
check = importlib.util.module_from_spec(spec)
spec.loader.exec_module(check)


class PolicyFailures(unittest.TestCase):
    def fixture(self, omit=()):
        # Preserve every fixture; cleanup needs explicit removal approval.
        base = Path(os.environ.get("POLICY_TEST_ROOT", str(REPO / "work/policy-test-evidence")))
        base.mkdir(parents=True, exist_ok=True)
        root = Path(tempfile.mkdtemp(dir=base))
        config = json.loads((REPO / "policy/agent-policy.json").read_text())
        for name in config["required_files"] + config["entry_points"]:
            if name in omit:
                continue
            dest = root / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text((REPO / name).read_text())
        (root / "policy").mkdir()
        (root / "policy/agent-policy.json").write_text(json.dumps(config))
        return root, config

    def verify(self, root):
        return check.verify(root, "policy/agent-policy.json")

    def save(self, root, config):
        (root / "policy/agent-policy.json").write_text(json.dumps(config))

    def test_valid_repository(self):
        root, _ = self.fixture()
        self.assertEqual(self.verify(root), ([], []))

    def test_each_missing_rule_fails(self):
        for rule in check.RULE_IDS:
            with self.subTest(rule=rule):
                root, config = self.fixture()
                path = root / config["policy_path"]
                path.write_text(re.sub(r"^## " + rule + r"[^\n]*\n.*?(?=^## |\Z)", "", path.read_text(), flags=re.M | re.S))
                self.assertTrue(self.verify(root)[0])

    def test_heading_without_rule_content_fails(self):
        root, config = self.fixture()
        path = root / config["policy_path"]
        path.write_text(re.sub(r"(^## R6[^\n]*\n).*?(?=^## |\Z)", r"\1Placeholder\n\n", path.read_text(), flags=re.M | re.S))
        self.assertTrue(self.verify(root)[0])

    def test_plain_path_without_link_fails(self):
        root, _ = self.fixture()
        path = root / "AGENTS.md"
        path.write_text(re.sub(r"\[[^\]]+\]\(docs/AI-OPERATING-RULES.md\)", "docs/AI-OPERATING-RULES.md", path.read_text()))
        self.assertTrue(self.verify(root)[0])

    def test_missing_entry_point_fails(self):
        root, _ = self.fixture(("CLAUDE.md",))
        self.assertTrue(self.verify(root)[0])

    def test_empty_or_weakened_manifest_fails(self):
        root, config = self.fixture()
        config["rules"] = []
        self.save(root, config)
        with self.assertRaises(ValueError):
            self.verify(root)

    def test_path_outside_repository_fails(self):
        root, config = self.fixture()
        config["required_files"].append("../outside")
        self.save(root, config)
        with self.assertRaises(ValueError):
            self.verify(root)

    def test_exception_requires_evidence_and_expiry(self):
        root, config = self.fixture(("CLAUDE.md",))
        config["exceptions"] = [{"path": "CLAUDE.md", "reason": "fixture", "owner": "QA"}]
        self.save(root, config)
        with self.assertRaises(ValueError):
            self.verify(root)

    def test_expired_exception_fails(self):
        root, config = self.fixture(("CLAUDE.md",))
        config["exceptions"] = [{"path": "CLAUDE.md", "reason": "fixture", "owner": "QA",
            "approval_url": "https://github.com/example/repo/pull/1",
            "approved_on": "2000-01-01", "expires_on": "2000-01-02"}]
        self.save(root, config)
        with self.assertRaises(ValueError):
            self.verify(root)

    def test_valid_missing_entry_exception_is_visible(self):
        root, config = self.fixture(("CLAUDE.md",))
        config["exceptions"] = [{"path": "CLAUDE.md", "reason": "fixture only", "owner": "QA",
            "approval_url": "https://github.com/example/repo/pull/1",
            "approved_on": "2000-01-01", "expires_on": "2999-01-01"}]
        self.save(root, config)
        self.assertEqual(self.verify(root), ([], ["CLAUDE.md"]))

    def test_removing_each_required_file_from_manifest_fails(self):
        for name in check.MANDATORY_FILES:
            with self.subTest(name=name):
                root, config = self.fixture()
                config["required_files"].remove(name)
                self.save(root, config)
                with self.assertRaises(ValueError):
                    self.verify(root)

    def test_removing_each_required_link_from_manifest_fails(self):
        for source, target in check.MANDATORY_LINKS:
            with self.subTest(source=source, target=target):
                root, config = self.fixture()
                config["required_links"] = [x for x in config["required_links"]
                                            if (x["from"], x["to"]) != (source, target)]
                self.save(root, config)
                with self.assertRaises(ValueError):
                    self.verify(root)

    def test_empty_content_checks_fail(self):
        root, config = self.fixture()
        config["content_checks"] = []
        self.save(root, config)
        with self.assertRaises(ValueError):
            self.verify(root)

    def test_removing_each_mandatory_content_phrase_fails(self):
        for path, phrases in check.MANDATORY_CONTENT.items():
            for phrase in phrases:
                with self.subTest(path=path, phrase=phrase):
                    root, config = self.fixture()
                    for item in config["content_checks"]:
                        if item["path"] == path:
                            item["phrases"] = [x for x in item["phrases"] if x != phrase]
                    self.save(root, config)
                    with self.assertRaises(ValueError):
                        self.verify(root)

    def test_removing_each_mandatory_rule_phrase_fails(self):
        for rule, phrases in check.MANDATORY_RULE_PHRASES.items():
            for phrase in phrases:
                with self.subTest(rule=rule, phrase=phrase):
                    root, config = self.fixture()
                    next(x for x in config["rules"] if x["id"] == rule)["required_phrases"].remove(phrase)
                    self.save(root, config)
                    with self.assertRaises(ValueError):
                        self.verify(root)


if __name__ == "__main__":
    unittest.main()
