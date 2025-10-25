---
applyTo: "**"
---

# Dependabot PR Review Instructions

When the PR author is `dependabot[bot]` or `dependabot`, perform a focused dependency update review.

## Review Process

### 1. Trace Usage

Identify the package name and search the codebase to understand how widely it's used:

```bash
rg "from ['\"]<package-name>" src/
rg "import.*<package-name>" src/
```

Report: How many files import this package and whether usage is centralized or scattered.

### 2. Summarize Release Changes

Read the changelog or release notes for the updated version. Document:

- **Key fixes** – What bugs were addressed
- **New features** – Any breaking or non-breaking additions
- **Breaking changes** – API modifications that affect usage
- **Version type** – Is this Major, Minor, or Patch?

### 3. Assess Risk

Rate the merge risk and provide a clear recommendation:

- **Low Risk** – Patch update, no breaking changes, minimal usage impact
- **Medium Risk** – Minor update or isolated breaking change, needs light verification
- **High Risk** – Major version, widespread breaking changes, or critical dependency

Recommend: **Merge** / **Review First** / **Hold**

## Comment Format

Post findings in a brief, scannable format:

```
📦 **Package:** <name> | **Change:** old.version → new.version

**Usage:** Used in X files
**Changes:** [Brief summary of key fixes/features]
**Risk:** Low / Medium / High
**Recommendation:** ✅ Merge / ⚠️ Review / ❌ Hold
**Notes:** [Any blockers or special considerations]
```
