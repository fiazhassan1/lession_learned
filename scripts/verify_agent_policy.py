"""Verify repository policy registration. No external requests or mutations."""
import argparse
import datetime
import json
from pathlib import Path
import re
import sys

# These IDs and entry points are governance invariants mandated by Fiaz, not business settings.
RULE_IDS = frozenset(("R1", "R2", "R3", "R4", "R5", "R6"))
ENTRY_POINTS = frozenset(("AGENTS.md", "CLAUDE.md"))


def verify(root, manifest):
    root = Path(root).resolve()
    errors = []
    def local(name):
        path = (root / name).resolve()
        if not path.is_relative_to(root):
            raise ValueError("Path escapes repository: " + name)
        return path

    config = json.loads(local(manifest).read_text(encoding="utf-8"))
    if config.get("schema_version") != 1:
        raise ValueError("Unsupported manifest schema")
    rules = config.get("rules", [])
    if {r["id"] for r in rules} != RULE_IDS or len(rules) != len(RULE_IDS):
        raise ValueError("Manifest must register each mandatory rule exactly once")
    entries = config.get("entry_points", [])
    if set(entries) != ENTRY_POINTS or len(entries) != len(ENTRY_POINTS):
        raise ValueError("Both agent entry points must be registered")
    exceptions = config.get("exceptions", [])
    exc_by_path = {}
    for exc in exceptions:
        path = exc["path"]
        if path not in entries or path in exc_by_path:
            raise ValueError("Exception must name one unique agent entry point")
        for field in ("reason", "owner", "approval_url", "approved_on", "expires_on"):
            if not exc.get(field):
                raise ValueError("Missing exception field: " + field)
        approved = datetime.date.fromisoformat(exc["approved_on"])
        expiry = datetime.date.fromisoformat(exc["expires_on"])
        today = datetime.datetime.now(datetime.timezone.utc).date()
        if not approved <= today <= expiry:
            raise ValueError("Exception is not currently valid: " + path)
        if not exc["approval_url"].startswith("https://github.com/"):
            raise ValueError("Exception requires GitHub review/decision evidence")
        if local(path).exists():
            raise ValueError("Exception cannot mask an existing entry point: " + path)
        exc_by_path[path] = exc
    required = config.get("required_files", [])
    if not required or config["policy_path"] not in required or config["roles_path"] not in required:
        raise ValueError("Required files must include policy and roles")
    texts = {}
    for name in set(required + entries):
        path = local(name)
        if name in exc_by_path:
            continue
        if not path.is_file():
            errors.append("Missing file: " + name)
        else:
            texts[name] = path.read_text(encoding="utf-8")
    policy = texts.get(config["policy_path"], "")
    for rule in rules:
        section = re.search(r"^## " + re.escape(rule["id"]) + r"[^\n]*\n(.*?)(?=^## |\Z)", policy, re.M | re.S)
        if not section:
            errors.append("Missing section: " + rule["id"])
        elif not rule.get("required_phrases"):
            raise ValueError("Rule must have nonempty phrase checks: " + rule["id"])
        else:
            for phrase in rule["required_phrases"]:
                if phrase not in section.group(1):
                    errors.append("Missing policy content: " + rule["id"] + ": " + phrase)
    for item in config.get("content_checks", []):
        if not item.get("phrases"):
            raise ValueError("Content check has no phrases")
        for phrase in item["phrases"]:
            if phrase not in texts.get(item["path"], ""):
                errors.append("Missing content: " + item["path"] + ": " + phrase)
    links = config.get("required_links", [])
    if not links:
        raise ValueError("No link checks registered")
    covered = {item["from"] for item in links if item["to"] == config["policy_path"]}
    if not (ENTRY_POINTS - set(exc_by_path)).issubset(covered):
        raise ValueError("Both available entry points must link to the policy")
    for item in links:
        if item["from"] in exc_by_path:
            continue
        source = local(item["from"])
        target = local(item["to"])
        destinations = re.findall(r"\[[^\]]+\]\(([^\s)]+)\)", texts.get(item["from"], ""))
        found = any((source.parent / dest.split("#")[0]).resolve() == target
                    for dest in destinations if not re.match(r"[a-zA-Z][a-zA-Z0-9+.-]*:", dest))
        if not found or not target.is_file():
            errors.append("Missing/broken relative link: " + item["from"] + " -> " + item["to"])
    return errors, list(exc_by_path)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True)
    parser.add_argument("--manifest", required=True)
    args = parser.parse_args()
    try:
        errors, exceptions = verify(args.root, args.manifest)
    except (OSError, ValueError, KeyError, TypeError) as error:
        print("FAIL: " + str(error), file=sys.stderr)
        return 1
    for error in errors:
        print("FAIL: " + error, file=sys.stderr)
    for name in exceptions:
        print("EXCEPTION: " + name + " (registered approval; inspect evidence)")
    if errors:
        return 1
    print("PASS: policy registration and links verified; review/adoption are separate gates")
    return 0


if __name__ == "__main__":
    sys.exit(main())
