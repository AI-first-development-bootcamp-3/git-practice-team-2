## Why

PR #5 (`enrichment-backend` → `development`) is blocked with Changes Requested because `development` merged PR #4 (task statistics + 4-status workflow) after this branch diverged, leaving 8 files in conflict. The reviewer requires the conflicts resolved before the enrichment features (priority, due date, tags) can land.

## What Changes

- Merge `origin/development` into `enrichment-backend` and resolve all 8 conflicting files so both feature sets coexist:
  - Server: combine status validation (todo|in-progress|review|done) with enrichment validation (priority, dueDate, tags) in `todoService.js` and `routes/todos.js`.
  - Server: preserve PR #4's deliberate 404-before-400 response ordering on PUT, including when the body contains invalid enrichment values.
  - Client: adopt development's restructured UI as the skeleton (router + TodosPage split, 4 status sections, status dropdown replacing the toggle button) and re-attach the enrichment UI (priority badge/selector, due date + overdue styling, tag chips + inline tag input, tag filtering) onto it.
  - Client: `api.js` keeps the enriched object-signature `create({ title, priority, dueDate, tags })` and gains development's `getStats()`.
  - Data: restore development's seed todos; rely on runtime `ENRICHMENT_DEFAULTS` instead of persisted enrichment keys.
  - **BREAKING** (branch-local): the two-section toggle-based TodoList described by the current canonical specs is replaced by the four-section status-dropdown layout from development.
- Push the merge commit so PR #5 becomes mergeable and can be re-reviewed.

## Capabilities

### New Capabilities

<!-- none — the stats capability arrives via development's own `add-task-statistics` change, which this merge carries along unmodified -->

### Modified Capabilities

- `todo-persistence`: status domain expands from `todo|done` to `todo|in-progress|review|done`, with the service rejecting invalid status values on create and update.
- `server-api`: POST accepts an optional validated status alongside enrichment fields; PUT returns 404 for a non-existent todo before any 400 validation error, including enrichment validation.
- `todo-components`: TodoList groups todos into four status sections; TodoItem exposes a status dropdown instead of a toggle button while keeping all enrichment metadata and controls; tag filtering operates across the four-section layout.

## Impact

- **Code**: `server/src/services/todoService.js`, `server/src/routes/todos.js`, `server/src/data/todos.json`, `client/src/services/api.js`, `client/src/components/App.jsx`, `client/src/components/TodoList.jsx`, `client/src/components/TodoItem.jsx`, `client/src/App.css`.
- **Incoming unmodified**: development's `openspec/changes/add-task-statistics/` change (stats endpoint + stats page specs) merges in cleanly and stays as-is.
- **Process**: PR #5 flips from `mergeable_state: dirty` to mergeable; NadavMantsur re-reviews.
- **Dependencies**: client gains `react-router-dom` (already in development's package-lock, auto-merged).
