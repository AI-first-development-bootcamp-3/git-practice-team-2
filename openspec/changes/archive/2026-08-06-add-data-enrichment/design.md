# Design: add-data-enrichment

## Context

See `proposal.md` — Why. Team 3 is dev 5 (backend) and dev 6 (frontend) working in parallel; teams 1 (board/status) and 2 (statistics) edit the same server files concurrently. The base app spreads `request.body` into the record on PUT with no field validation, and `todos.json` already holds records without the new fields.

## Goals / Non-Goals

**Goals:**
- One consistent pattern ("optional field + validation + UI slot") applied three times: priority, dueDate, tags
- Both developers can work simultaneously — frontend against mock data until the backend merges
- Minimal collision surface with teams 1 and 2

**Non-Goals:**
- No changes to `status` semantics or endpoints (team 1's scope, including `PATCH /:id/status`)
- No statistics work (team 2's scope) — but the fields we add become available to their aggregations
- No tag entities/CRUD (tags are plain strings), no drag & drop, no board rendering

## Decisions

- **No new endpoints.** All three fields ride the existing `POST /api/todos` and `PUT /api/todos/:id`. Alternative: dedicated `PATCH /priority` like team 1's status endpoint — rejected: adds surface area for no gain; PUT already accepts partial updates.
- **API paths stay `/api/todos`** even though the plan PDF writes `/api/tasks`. A rename touches every file all three teams edit — maximum conflict, zero function.
- **Defaults on read, no migration.** `readTodos()` fills `priority: 'medium'`, `dueDate: null`, `tags: []` for legacy records. Alternative: one-time migration script — rejected: every teammate has a diverged local `todos.json`; defaults-on-read makes them all valid.
- **Validation scope: our fields only.** POST/PUT reject invalid `priority`/`dueDate`/`tags` but the existing body-spread behavior is otherwise untouched. Whitelisting all fields would silently absorb team 1's status work — their call, communicated at sync.
- **`dueDate` is a date-only string (`YYYY-MM-DD`) or null.** No timestamps, no timezone math; overdue = `dueDate < today's local date` AND status ≠ done. No date library — native `<input type="date">` produces this format directly.
- **Tags are plain strings; color derived from name.** Hash the tag name into a fixed 8–10 color palette so the same tag is the same color everywhere with zero storage. Alternative: tag entities with user-picked colors (`tags.json`, tagIds, CRUD) — rejected for workshop scope; revisit only if far ahead of schedule.
- **Tag normalization server-side**: trim + dedupe on write, reject empty strings. Keeps the client simple and the file clean.
- **Shared UI constants in `client/src/constants.js`** (priority levels, tag palette). If team 1 lands a constants file first, merge into theirs rather than creating a second one.
- **CSS appended at the end of `App.css`** under `/* Feature N */` markers — the team's agreed convention to reduce merge conflicts in the hottest shared file.

## Risks / Trade-offs

- [Same-line conflicts in `todoService.js`/`routes/todos.js` with teams 1 & 2] → backend work for all three features batched into single passes through those files; merge early, pull before push
- [`api.js` `create(title)` signature change breaks callers] → change to object parameter announced in team channel the moment it merges; other teams' calls keep working until they pull
- [Client-derived tag colors shift if the palette changes] → palette is append-only once merged
- [PUT still spreads unknown fields] → accepted; noted to team 1 as their decision point
- [Frontend blocked until backend merges] → mock `api` object for dev 6 (built when needed), integration at each phase boundary

## Migration Plan

None needed — defaults-on-read handles legacy data; each feature merges independently (priority → dueDate → tags), and reverting any one is a plain git revert with no data cleanup.
