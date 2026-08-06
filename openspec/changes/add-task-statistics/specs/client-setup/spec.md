## ADDED Requirements

### Requirement: Statistics API Method
The client SHALL provide an API service method for fetching aggregate task stats.

#### Scenario: Fetch stats
- **WHEN** api.todos.getStats() is called
- **THEN** GET request is made to /api/todos/stats

### Requirement: Client-Side Routing
The client SHALL use client-side routing to navigate between the Todos page and the Statistics page without a full page reload.

#### Scenario: Route to todos
- **WHEN** user navigates to /
- **THEN** the Todos page is rendered

#### Scenario: Route to stats
- **WHEN** user navigates to /stats
- **THEN** the Statistics page is rendered
