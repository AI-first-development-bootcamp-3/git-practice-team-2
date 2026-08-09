> Owner tags below assume two coders working in parallel: `[Server]` and `[Client]` tracks touch disjoint files and can proceed independently, branching off as `add-task-statistics/server` and `add-task-statistics/client`. `[Both]` (§8) happens after both branches are merged.

## 1. Server: Status Model [Server]

- [x] 1.1 Define the valid status list (`todo`, `in-progress`, `review`, `done`) as a shared constant in `server/src/services/todoService.js`
- [x] 1.2 Add status validation to `create`/`update` in `todoService.js`, rejecting values outside the valid list
- [x] 1.3 Return a 400 error with message from the `POST` and `PUT` routes in `server/src/routes/todos.js` when status validation fails

## 2. Server: Statistics Endpoint [Server]

- [x] 2.1 Add `todoService.getStats()` that reads all todos and returns `{ total, byStatus: { todo, 'in-progress', review, done } }`, zero-filling any status with no todos
- [x] 2.2 Add `GET /api/todos/stats` route in `server/src/routes/todos.js` (register before `/:id` to avoid route collision), returning the DTO from `getStats()`

## 3. Client: Dependencies and API Service [Client]

- [x] 3.1 Add `react-router-dom` to `client/package.json` and install
- [x] 3.2 Add `api.todos.getStats()` to `client/src/services/api.js`, calling `GET /api/todos/stats` (can be built now against the DTO in design.md — `{ total, byStatus: { todo, 'in-progress', review, done } }` — without waiting on the server track)

## 4. Client: Routing and Navigation [Client]

- [x] 4.1 Wrap the app in `BrowserRouter` in `client/src/main.jsx` (or `App.jsx`)
- [x] 4.2 Split `App.jsx` into a router with two routes: `/` (existing todos view) and `/stats` (new statistics view)
- [x] 4.3 Add a nav link from the Todos page to `/stats`
- [x] 4.4 Add a nav link from the Statistics page back to `/`

## 5. Client: Status Selector [Client]

- [x] 5.1 Replace the toggle button in `client/src/components/TodoItem.jsx` with a status selector (`<select>`) listing all 4 statuses
- [x] 5.2 Replace the `onToggle` prop/handler with `onStatusChange(id, newStatus)` in `TodoItem.jsx` and its parent(s)
- [x] 5.3 Update `App.jsx`'s `handleToggle` to a `handleStatusChange(id, newStatus)` that calls `api.todos.update(id, { status: newStatus })`

## 6. Client: Grouped Todo List [Client]

- [x] 6.1 Update `client/src/components/TodoList.jsx` to group todos into 4 sections: To Do, In Progress, Review, Done
- [x] 6.2 Keep per-section item counts and the existing empty-state message

## 7. Client: Statistics Page [Client]

- [x] 7.1 Create `client/src/components/Stats.jsx`: fetches `api.todos.getStats()` on mount, shows loading/error states
- [x] 7.2 Render total task count and a count per status (todo, in-progress, review, done), including statuses at 0
- [x] 7.3 Add minimal styling consistent with the existing app (reuse `App.css` patterns)

## 8. Verification [Both, after merging server + client branches]

- [ ] 8.1 Manually test: create a todo, move it through todo → in-progress → review → done via the status selector, confirm stats update after navigating to `/stats`
- [ ] 8.2 Manually test: `GET /api/todos/stats` with an empty `todos.json` returns all-zero counts
- [ ] 8.3 Manually test: `PUT /api/todos/:id` with an invalid status value returns 400
- [ ] 8.4 Manually test: navigate `/` → `/stats` → `/` and confirm browser back/forward also work
