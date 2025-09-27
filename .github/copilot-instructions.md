# AI Coding Assistant Instructions

This directory contains modular instructions for AI coding assistants working on this project.

## Quick Reference

**Key Commands:**

```bash
pnpm dev     # Development with Turbopack
pnpm build   # Build the project
```

## General Guidelines

**Best Practice vs Technical Possibility:**
When providing solutions, clearly distinguish between what's technically possible and what's considered best practice or industry standard. Always explain the trade-offs and recommend the approach that aligns with established conventions and maintainability.

Examples:

- ✅ "You could commit API keys directly to the codebase, but it's not secure best practice. Use environment variables instead."
- ✅ "While `any` type works technically, it defeats TypeScript's purpose. Use proper typing for better code safety."
- ✅ "Direct database queries in components are possible, but violate separation of concerns. Use the established adapter pattern."
