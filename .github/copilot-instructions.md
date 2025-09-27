# Code Conventions

## Commit Message Format

Follow Conventional Commits:

### Format: type(scope?): subject

**Allowed types:** feat, fix, docs, style, refactor, perf, test, chore, ci, build

**Rules:**

- Subject: imperative, concise (≤ 50 chars), no trailing period
- Body (optional): provide additional context if needed
- Footer (optional): use for BREAKING CHANGE: description or issue references

### Examples

```
feat(parser): add ability to parse directional sentiment
fix(api): handle null responses from upstream
docs(readme): update setup instructions
```

## Naming Conventions

### Files & Directories

- **Files**: kebab-case (`get-poll-feed.ts`)
- **Directories**: kebab-case Next.js route groups and files `(adapters)`, `(in-adapter)`, `(out-adapter)`, `(public)`

### Functions & Types

- **Functions**: camelCase factory functions (`createPollFeedSource`)
- **Types**: PascalCase with descriptive suffixes (`PollFeedSource`, `GetPollFeedInput`)
- **Constants**: SCREAMING_SNAKE_CASE for module-level constants

### Variables

Use descriptive names that convey purpose and context:

- ✅ `pollTitle`, `userEmail`, `voteCount`
- ❌ `title`, `email`, `count`
- ✅ `currentPoll`, `selectedOption`
- ❌ `x`, `y`,

**Transformation Variables**

Use specific names when the transformation is specific:

- ✅ `clampedLimit` (after Math.min/Math.max clamp)
- ✅ `resolvedQuorum` (after applying defaults)
- ✅ `validatedLimit` (after schema/domain validation)

**Collection Variables**

Avoid vague prefixes like `effective*` on collections. Name by role instead:

- ✅ `pageItems`, `visibleItems`, `currentPolls`
- ❌ `effectivePolls`, `effectiveItems`

**Note**: Import ordering is automatically handled by `@trivago/prettier-plugin-sort-imports` - no manual sorting required.

## Code Structure Patterns

## TypeScript Patterns

- Use `type` for all type definitions (avoid mixing `interface` and `type` keywords)
- Use `import type` rather than `import` when importing types and interfaces
- Prefer functions over classes for implementation
- Favor functional programming patterns over imperative loops
  - ✅ `items.map(item => transform(item))`
  - ❌ `for (const item of items) { ... }`
  - ✅ `items.filter(predicate).find(condition)`
  - ❌ Manual loop with break/continue statements
