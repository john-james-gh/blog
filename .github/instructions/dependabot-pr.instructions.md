---
applyTo: "**"
---

# Dependabot PR Review Instructions

When the PR author is `dependabot[bot]` or `dependabot`, perform a comprehensive dependency update review and post your findings as a comment.

## Review Checklist

Answer the following questions about the updated dependency:

### 1. Usage Analysis

**Is the package used once?**

- Search the codebase for import statements of this package
- Count the number of files importing from this package
- Determine if usage is centralized or widespread

### 2. Necessity Assessment

**Can it be removed and rewritten in the codebase instead?**

- Evaluate if the package provides unique functionality
- Consider if the functionality is simple enough to implement directly
- Assess maintenance burden vs. reimplementation cost
- For small utility packages, consider inline implementation
- For complex packages (frameworks, build tools), recommend keeping

### 3. Test Coverage Requirements

**Do I need new tests?**

- Check if the update includes breaking changes
- Review changelog for API modifications
- Determine if existing tests cover the updated functionality
- Recommend new tests for:
  - Breaking changes
  - New features being adopted
  - Changed behavior in critical paths

## Generate Facts Block

Create a structured facts block with the following information:

### Usage Count

```bash
# Search for import statements
grep -r "from ['\"]<package-name>" src/
grep -r "require(['\"]<package-name>" src/
```

Report: "Used in X files across Y locations"

### Affected Projects

```bash
# Use Nx to determine impact (if Nx is configured)
npx nx print-affected --type=lib --type=app
```

Report affected project names or "N/A (single project)" if not using Nx monorepo

### Dependency Type

- Parse `package.json` to determine if the package is in:
  - `dependencies` (production)
  - `devDependencies` (development only)
  - `peerDependencies` (peer requirement)

Report: "Dev-only: Yes/No"

### Version Change Analysis

Extract from PR title or description:

- **Change Type**: Major (X.0.0) / Minor (0.X.0) / Patch (0.0.X)
- **Version**: `old.version.number` → `new.version.number`
- **Changelog URL**: Construct URL from package repository
  - npm: `https://www.npmjs.com/package/<name>/v/<version>`
  - GitHub: Check package.json repository field for CHANGELOG.md

## Comment Format

IMPORTANT: Use actual blank lines between sections (press Enter twice), NOT the literal characters \n or any escape sequences.
Post a comment to the PR with this exact structure for each updated dependency:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 DEPENDABOT PR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 PACKAGE: <package-name>

VERSION CHANGE: old.version → new.version (Major/Minor/Patch)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 FACTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Usage Count: Used in X files across Y import locations
• Affected Projects: project-a, project-b (or "N/A - single project")
• Dev-only: Yes/No
• Changelog: <changelog-url>
• Known Codemod: Yes - npx command / No

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ REVIEW FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IS THE PACKAGE USED ONCE?
[Your analysis - e.g., "No, widely used across 15 components"]

CAN IT BE REMOVED AND REWRITTEN?
[Your assessment - e.g., "Not recommended. This is a core framework dependency with complex functionality"]

DO I NEED NEW TESTS?
[Your recommendation - e.g., "Yes, the changelog indicates breaking changes to the API. Recommend testing:
• Feature X behavior
• Integration with Y component"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚦 RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTION: ✅ Approve and merge / ⚠️ Review required / ❌ Do not merge

REASONING: [Brief explanation]

NEXT STEPS:

1. [Specific action items if needed]
2. [E.g., "Run codemod before merging"]
3. [E.g., "Add tests for new API"]
