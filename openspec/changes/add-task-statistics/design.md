## Context

See proposal.md - Why. Today status is binary (`todo|done`), computed nowhere (the client already holds the full todo list, so there's never been a reason for a dedicated stats path). This change adds two new statuses and a dedicated stats view, decided with the user as: extend the status enum now, compute stats server-side, and navigate via `react-router-dom`.

## Goals / Non-Goals

**Goals:**
- Single, reusable source of truth for status counts (the server), so any future client (or a second page) doesn't reimplement counting logic
- Statistics page reachable from, and returning to, the main Todos page
- Status counts always include all 4 statuses, even at 0, so the UI never has to guess a status exists

**Non-Goals:**
- Historical/time-series stats (e.g., "todos completed this week") — this change is a point-in-time snapshot only
- Filtering or drilling into the todo list from the stats page (e.g., click "Review: 3" to see those 3 todos) — future enhancement
- Enforcing a status *transition* order (e.g., blocking todo → done directly, skipping review) — any status is selectable from any other in this change

## Decisions

### Stats computed server-side, exposed via `GET /api/todos/stats`
Alternative considered: client-side reduce over the already-fetched todo list (zero new endpoint, matches the app's "keep it simple" workshop philosophy). Rejected per user direction: server-side keeps counting logic in one place (`todoService`) rather than duplicated in every client that wants counts, and keeps the payload small if the todo list ever grows large enough that fetching it just to count it becomes wasteful.

### Response DTO shape
```json
{
  "total": 3,
  "byStatus": {
    "todo": 1,
    "in-progress": 0,
    "review": 0,
    "done": 2
  }
}
```
`byStatus` always contains all 4 keys (zero-filled), so the client never has to special-case a missing status — it just renders `stats.byStatus['in-progress'] ?? 0` style access without the `??`. Flat `total` alongside `byStatus` (rather than deriving total by summing on the client) keeps the DTO self-describing and matches the "server owns the computation" decision above.

### `todoService.getStats()` computes from `readTodos()`, not a running counter
Alternative considered: maintain counts incrementally on every create/update/delete. Rejected — the data file is small (workshop-scale), file reads are already the pattern for every other operation in `todoService`, and an incremental counter risks drifting from the file if it's ever edited by hand (a realistic workshop scenario).

### Status selector replaces the toggle button
`TodoItem`'s single toggle (`todo ⇄ done`) can't represent 4 states. Replaced with a `<select>` (or equivalent) offering all 4 statuses, calling `onStatusChange(id, newStatus)`. No ordering/workflow constraints are enforced — any status can move to any other — keeping this change additive rather than introducing a state machine.

### Routing via `react-router-dom`, two routes: `/` and `/stats`
Alternative considered: a `view` state flag in `App.jsx` toggling between components (no new dependency). Rejected per user direction in favor of real routes — bookmarkable/shareable URLs and browser back/forward support, at the cost of one new dependency in a workshop app that otherwise has none.

## Risks / Trade-offs

- **[Risk]** Existing `todos.json` rows only ever contain `todo`/`done` → stats page will show `in-progress: 0` and `review: 0` until someone actually moves a task there. **Mitigation**: none needed — this is correct behavior, not a bug; it's called out explicitly in the spec (`Zero count for empty status`).
- **[Risk]** No status transition validation on the data model beyond "is it one of the 4 valid values" → a task can jump straight from `todo` to `done`, skipping `review`. **Mitigation**: accepted as non-goal for this change; a future change can add workflow rules if the team wants them.
- **[Risk]** `react-router-dom` is a new dependency in a previously dependency-light client. **Mitigation**: accepted per user decision; it's a widely-used, stable library and the workshop app already pulls in Vite/React tooling.
