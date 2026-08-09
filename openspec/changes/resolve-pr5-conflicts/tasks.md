so# Tasks: resolve-pr5-conflicts

## 1. Merge

- [ ] 1.1 `git fetch origin` and confirm `origin/development` head is still 6f69cb3 (re-check conflict set if it moved)
- [ ] 1.2 On `enrichment-backend`, run `git merge origin/development` and confirm the 8 expected files conflict

## 2. Resolve server conflicts

- [ ] 2.1 `server/src/services/todoService.js`: keep both `ENRICHMENT_DEFAULTS` and `VALID_STATUSES`; in `create()` use development's validated `status` plus enrichment defaults (`priority ?? 'medium'`, `dueDate ?? null`, `tags ?? []`)
- [ ] 2.2 `server/src/routes/todos.js` POST: title check, then `validateEnrichmentFields`, then try/catch `todoService.create({ title, status, priority, dueDate, tags })`
- [ ] 2.3 `server/src/routes/todos.js` PUT: `getById` existence check (404) before `validateEnrichmentFields` (400), then try/catch `update()` for status errors
- [ ] 2.4 `server/src/data/todos.json`: take development's side (restores seed todos 1–2; runtime defaults cover enrichment keys)
- [ ] 2.5 CHECKPOINT — stage the four server files (`git add`) and show the user the resolved diff (`git diff --staged --stat` plus the resolved hunks); do not continue until the user approves (rollback here: `git checkout --merge -- <file>` re-conflicts a file, or `git merge --abort` restarts)

## 3. Resolve client conflicts

- [ ] 3.1 `client/src/services/api.js`: keep enriched `create({ title, priority, dueDate, tags })` signature and add development's `getStats()`
- [ ] 3.2 `client/src/components/App.jsx`: TodoList props = filtered `todos` (tag filter) + `onStatusChange={handleStatusChange}`; remove `onToggle`
- [ ] 3.3 `client/src/components/TodoList.jsx`: development's `SECTIONS` 4-section structure with widened props `{ todos, onStatusChange, onDelete, onUpdate, onTagClick }` passed to each TodoItem
- [ ] 3.4 `client/src/components/TodoItem.jsx`: development's status dropdown replaces toggle; combined prop signature; keep `overdue` class on wrapper div
- [ ] 3.5 `client/src/App.css`: keep both enrichment styles and stats styles
- [ ] 3.6 CHECKPOINT — stage the five client files and show the user the resolved diff for review; do not continue until the user approves (same rollback options as 2.5)

## 4. Commit gate

- [ ] 4.1 Show the full staged summary (`git status`, `git diff --staged --stat`) and wait for explicit user approval to commit
- [ ] 4.2 Create the merge commit with a message listing the per-file resolution decisions (single commit — git does not allow splitting a conflicted merge into multiple commits)

## 5. Verify (fixes become separate commits)

- [ ] 5.1 `npm install` in client (react-router-dom arrives via merged package-lock), start server and client
- [ ] 5.2 API checks: POST with enrichment fields + status; POST invalid status → 400; PUT non-existent id with invalid body → 404 (not 400); PUT invalid priority on existing todo → 400; GET /api/todos/stats returns counts for all four statuses
- [ ] 5.3 Browser walkthrough: four status sections render; status dropdown moves a todo between sections; priority badge/selector, due date + overdue styling, tag chips + inline add, tag filtering all work; stats page loads via header link
- [ ] 5.4 Any defect found in 5.2/5.3 is fixed in its own separate commit (never amend the merge commit) so each fix can be reviewed or reverted independently

## 6. Push gate

- [ ] 6.1 Show the user `git log --oneline origin/enrichment-backend..HEAD` (all new commits) and wait for explicit approval before pushing
- [ ] 6.2 Push `enrichment-backend`, confirm PR #5 reports mergeable, request re-review from NadavMantsur (rollback after push: `git revert -m 1 <merge-commit>`)
