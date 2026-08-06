# Tasks

Categorized by side: groups 1–3 are Backend (Dev 5), groups 4–6 are Frontend (Dev 6), group 7 is joint. The two sides run in parallel — Dev 6 works against mock data until the matching backend group merges. Phase order within each side: priority → due date → tags.

## 1. Backend (Dev 5) — Priority

- [x] 1.1 `todoService.js`: store `priority` in `create()`, defaulting to `'medium'` when not provided
- [x] 1.2 `todoService.js`: apply defaults for legacy records on read (`priority: 'medium'`, `dueDate: null`, `tags: []`)
- [x] 1.3 `routes/todos.js`: POST rejects priority outside `low|medium|high` with 400 listing allowed values
- [x] 1.4 `routes/todos.js`: PUT applies the same priority validation when the field is present
- [x] 1.5 Verify: POST without priority → `medium`; POST/PUT with `high` persists to `todos.json`; PUT with `"urgent"` → 400; legacy records load with `medium`. Merge + announce

## 2. Backend (Dev 5) — Due Date

- [x] 2.1 `todoService.js`: store `dueDate` in `create()` (null when absent)
- [x] 2.2 `routes/todos.js`: POST/PUT validate `dueDate` is a `YYYY-MM-DD` string or null, 400 otherwise
- [x] 2.3 Verify: create with/without date, invalid format → 400, legacy records load with null. Merge + announce

## 3. Backend (Dev 5) — Tags

- [x] 3.1 `todoService.js`: store `tags` in `create()`, defaulting to `[]`
- [x] 3.2 `routes/todos.js`: POST/PUT validate tags is an array of non-empty strings; trim and dedupe before storing; 400 otherwise
- [x] 3.3 Verify: create with/without tags, duplicates collapse, `[""]` → 400, legacy records load with `[]`. Merge + announce

## 4. Frontend (Dev 6) — Priority

- [x] 4.1 Create `client/src/constants.js` with priority levels (label, color, icon per level)
- [x] 4.2 `AddTodo.jsx`: priority selector defaulting to `medium`
- [x] 4.3 `api.js`: change `create(title)` to `create({ title, priority })` — announce signature change on merge
- [x] 4.4 `TodoItem.jsx`: priority badge (color/icon from constants) + selector to change priority via `update()`
- [x] 4.5 `App.css`: badge styles appended under `/* Feature 4: priority */`
- [ ] 4.6 Verify: create at each level, badge colors correct, priority change survives refresh. Merge

## 5. Frontend (Dev 6) — Due Date

- [x] 5.1 `AddTodo.jsx`: optional `<input type="date">`, included in the create payload
- [x] 5.2 `TodoItem.jsx`: show due date when set; overdue styling when `dueDate < today` and status ≠ done
- [x] 5.3 `App.css`: due-date/overdue styles under `/* Feature 6: due date */`
- [ ] 5.4 Verify: yesterday's date shows overdue, done tasks never show overdue, no date still works. Merge

## 6. Frontend (Dev 6) — Tags

- [ ] 6.1 `constants.js`: tag color derivation — name hashed into a fixed 8–10 color palette
- [ ] 6.2 `AddTodo.jsx`: chip input (Enter adds, X removes), tags included in the create payload
- [ ] 6.3 `TodoItem.jsx`: render colored chips; add/remove tags on an existing todo via `update()`
- [ ] 6.4 `App.jsx`: clicking a chip filters the list to that tag, with visible active-filter indication and a clear action
- [ ] 6.5 `App.css`: chip styles under `/* Feature 10: tags */`
- [ ] 6.6 Verify: multiple tags per task, same name = same color everywhere, filter applies and clears. Merge

## 7. Integration (both devs)

- [ ] 7.1 After each phase: integrate front against real backend (drop mock), verify together, pull main before push
- [ ] 7.2 Hand off to team 1: badge + chips on their board card component (do not edit their files)
- [ ] 7.3 Final walkthrough: create task with priority + due date + tags → edit each → filter by tag → everything survives refresh
