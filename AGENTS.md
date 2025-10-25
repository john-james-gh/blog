# Agent Instructions

## Codex CLI

When Dependabot (`dependabot` or `dependabot[bot]`) authors a PR, review it with this flow before approving:

1. **Trace Usage**  
   Identify the updated dependency, then search the codebase (prefer `rg`) to see how widely the package is imported or referenced.
2. **Summarize Release Changes**  
   Read the changelog or release notes for the upgrade and capture relevant fixes, features, and breaking changes that affect how we use the dependency.
3. **Assess Risk**  
   Rate the merge risk (Low/Medium/High) based on the release notes and current usage, and recommend whether to merge, request more verification, or hold the PR.

Document findings clearly so maintainers understand the impact before merging, and post the complete assessment as a PR comment for visibility.
