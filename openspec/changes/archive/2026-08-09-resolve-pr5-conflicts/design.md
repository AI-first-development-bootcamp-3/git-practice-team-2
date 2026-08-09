# Design: resolve-pr5-conflicts

## Context

See proposal.md — Why. `enrichment-backend` and `development` diverged: development merged PR #4 (4-status workflow, stats endpoint, stats page, client routing) while this branch added enrichment (priority, dueDate, tags). A dry-run merge (`git merge-tree`) confirms 8 conflicting files; everything else — including development's unarchived `openspec/changes/add-task-statistics/` change and the client `package-lock.json` with `react-router-dom` — auto-merges cleanly.

## Goals / Non-Goals

**Goals**
- One merge commit on `enrichment-backend` that makes PR #5 mergeable with both feature sets fully working.
- Preserve development's deliberate response-ordering contract (404 before 400 on PUT) even with enrichment validation added.

**Non-Goals**
- No new features, refactors, or style changes beyond what conflict resolution requires.
- No rebase — a merge commit keeps the shared PR branch history intact.
- No archiving of development's `add-task-statistics` change; it merges through untouched.

## Decisions

1. **Merge, not rebase.** The branch backs an open PR others have reviewed; rewriting its history would invalidate the review thread and force-push over shared refs.

2. **Development's client structure is the skeleton; enrichment re-attaches to it.** PR #4 restructured the client (router + TodosPage split, `SECTIONS`-driven 4-section TodoList, status `<select>` replacing the toggle button). Resolving in favor of the enrichment side would silently revert that refactor — the enrichment side even references identifiers (`handleToggle`, `pendingTodos`) that no longer exist post-merge. So every client conflict resolves to development's structure with enrichment props/UI threaded through:
   - `App.jsx`: `todos={filterTag ? todos.filter(...) : todos}` (ours) + `onStatusChange={handleStatusChange}` (theirs); drop `onToggle`.
   - `TodoList.jsx`: their `SECTIONS` map; signature widens to `{ todos, onStatusChange, onDelete, onUpdate, onTagClick }` and passes all through to TodoItem.
   - `TodoItem.jsx`: their `STATUSES` constant + status dropdown; keep our overdue class on the wrapper div; combined prop signature; the enrichment UI below the conflict is already auto-merged.
   - `api.js`: our object-signature `create({ title, priority, dueDate, tags })` **must** win (the auto-merged body already serializes those fields) + their `getStats()`.
   - `App.css`: keep both blocks (purely additive).

3. **Server-side: union of both validations, with explicit ordering.**
   - `todoService.js`: keep both top-level constants (`ENRICHMENT_DEFAULTS`, `VALID_STATUSES`); in `create()`, take development's validated `status` variable plus our three enrichment defaults — drop our hardcoded `status: 'todo'` (theirs already defaults to `'todo'` and validates).
   - `routes/todos.js` POST: title check → `validateEnrichmentFields` → try/catch `create()` passing `{ title, status, priority, dueDate, tags }`.
   - `routes/todos.js` PUT: add an explicit `getById` existence check **before** enrichment validation so 404 wins over 400 (see server-api delta spec), then try/catch `update()` for status errors.

4. **`todos.json`: take development's side.** It restores seed todos 1–2. Persisted enrichment keys are unnecessary because the auto-merged `readTodos()` applies `ENRICHMENT_DEFAULTS` at read time (covered by the todo-persistence "Legacy records" scenario).

## Risks / Trade-offs

- [Semantic breakage invisible to git — files merge textually but call each other wrongly] → Full-stack manual verification after the merge: start server + client, exercise create-with-enrichment, status dropdown moves items across the 4 sections, stats page, tag filter.
- [PUT existence check adds a second file read per update] → Acceptable for a JSON-file practice app; correctness of the response contract outweighs it.
- [Development moves again while we resolve] → Re-fetch immediately before merging; window is small.

## Migration Plan

Checkpointed flow — the user reviews and approves at each gate before work continues:

1. On `enrichment-backend`, `git fetch` then `git merge origin/development`.
2. Resolve the 4 server files per Decisions 3–4, then **checkpoint**: stage them and present the resolved diff for user review.
3. Resolve the 5 client files per Decision 2, then **checkpoint**: stage them and present the resolved diff for user review.
4. **Commit gate**: show the full staged summary; on user approval, create the merge commit. (Git constraint: a conflicted merge concludes in exactly one commit — per-file commits are impossible mid-merge, which is why control comes from staged-diff checkpoints instead.)
5. Verify (server API checks + browser walkthrough). Each defect fix lands as its own separate commit — never amending the merge commit — so fixes are individually reviewable and revertable.
6. **Push gate**: show all unpushed commits; on user approval, push. PR #5 refreshes automatically.
7. Rollback options by stage: during resolution, `git checkout --merge -- <file>` re-conflicts one file or `git merge --abort` restarts; after commit but before push, `git reset --hard origin/enrichment-backend`; after push, `git revert -m 1 <merge-commit>` (and plain `git revert` for any fix commit).
