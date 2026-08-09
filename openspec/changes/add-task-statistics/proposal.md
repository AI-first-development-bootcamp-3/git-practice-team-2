## Why

The team's workflow has grown beyond a simple todo/done toggle — tasks now move through `todo → in-progress → review → done` — but the UI still only exposes two states and gives no aggregate view of where work stands. A Statistics page lets anyone see task counts at a glance (total and per-status), and requires the status model itself to support the full workflow so the counts are meaningful rather than mostly zero.

## What Changes

- **BREAKING**: Extend the todo status enum from `todo | done` to `todo | in-progress | review | done`
- Replace the TodoItem's binary toggle button with a status selector (dropdown) that lets a todo move through all 4 statuses
- Update TodoList grouping from 2 sections (To Do / Done) to 4 sections (To Do / In Progress / Review / Done)
- Add a new server endpoint `GET /api/todos/stats` that computes and returns total task count plus count per status (server-side calculation, per team decision)
- Add a new client Statistics page (route `/stats`) that fetches and displays the stats DTO: total count and a count per status
- Add client-side routing via `react-router-dom` (new dependency) with nav links between the Todos page (`/`) and the Statistics page (`/stats`), including a way back
- Update the client API service with a `getStats()` method

## Capabilities

### New Capabilities
- `task-statistics`: Statistics page displaying total task count and counts broken down by status, computed server-side via a dedicated endpoint

### Modified Capabilities
- `todo-persistence`: status field enum extends from `todo|done` to `todo|in-progress|review|done`
- `server-api`: new `GET /api/todos/stats` endpoint
- `todo-components`: TodoItem toggle becomes a 4-way status selector; TodoList grouping becomes 4 sections; App gains route-based navigation
- `client-setup`: API service gains `getStats()`; client adds `react-router-dom` dependency and route configuration

## Impact

- **Server**: `server/src/services/todoService.js` (stats computation), `server/src/routes/todos.js` (new route), `server/src/data/todos.json` (existing rows are unaffected — `todo`/`done` remain valid values within the wider enum)
- **Client**: `client/src/components/App.jsx` (routing), `client/src/components/TodoItem.jsx` (status selector), `client/src/components/TodoList.jsx` (4-section grouping), new `client/src/components/Stats.jsx` (or similar), `client/src/services/api.js` (`getStats()`)
- **Dependencies**: adds `react-router-dom` to `client/package.json`
- **No database migration needed**: file-based storage, existing `todo`/`done` values remain valid under the extended enum
