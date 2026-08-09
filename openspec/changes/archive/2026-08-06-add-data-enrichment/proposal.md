# Proposal: add-data-enrichment

## Why

Team 3 ("data enrichment", dev 5 backend + dev 6 frontend) owns enriching tasks with metadata per the agreed MVP plan: priority (MVP scope), then due date and tags (stretch). Tasks today carry only title + status, so users cannot tell what is urgent, what is late, or how tasks are categorized.

## What Changes

- Add `priority` (`low | medium | high`, default `medium`) to the todo model, settable at creation and edit, with a visual badge in the UI
- Add optional `dueDate` (`YYYY-MM-DD` or null) with a date picker, shown on the task, and overdue highlighting for past-due unfinished tasks
- Add `tags` (array of strings, default `[]`) with colored chips (color derived from tag name), add/remove UI, and a click-to-filter on chips
- Validate all three fields on POST and PUT (400 with allowed values on invalid input)
- Old records in `todos.json` are read back with defaults applied — no migration
- Not changing: endpoints stay `POST /api/todos` and `PUT /api/todos/:id` (no new routes); `status` stays out of this change's DTO (owned by team 1's board work)

## Capabilities

### New Capabilities

(none — all changes extend existing capabilities)

### Modified Capabilities

- `todo-persistence`: Todo Data Model gains `priority`, `dueDate`, `tags` with defaults and legacy-record handling
- `server-api`: Create and Update endpoints accept and validate the three new fields
- `todo-components`: AddTodo gains priority/due-date/tag inputs; TodoItem displays and edits them, including overdue styling and tag-chip filtering

## Impact

- Server: `server/src/services/todoService.js`, `server/src/routes/todos.js` (shared hotspot with teams 1 and 2 — merge early and often)
- Client: `client/src/components/AddTodo.jsx`, `TodoItem.jsx`, `App.jsx`, `client/src/services/api.js` (`create` signature changes — announce on merge), `App.css`, new `client/src/constants.js`
- No new dependencies; native `<input type="date">`, no date library
- Cross-team: showing badge/chips on team 1's board cards is handed off to team 1 (one-line change in their component)
