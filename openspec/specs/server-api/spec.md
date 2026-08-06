# server-api Specification

## Purpose
TBD - created by archiving change add-server-api-routes. Update Purpose after archive.
## Requirements
### Requirement: List Todos Endpoint
The API SHALL provide an endpoint to list all todos.

#### Scenario: Get all todos
- **WHEN** GET /api/todos is called
- **THEN** all todos are returned as JSON array

### Requirement: Get Single Todo Endpoint
The API SHALL provide an endpoint to get a single todo by ID.

#### Scenario: Get existing todo
- **WHEN** GET /api/todos/:id is called with valid ID
- **THEN** the todo is returned as JSON

#### Scenario: Get non-existent todo
- **WHEN** GET /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo, accepting optional priority, dueDate, and tags.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with title in body
- **THEN** new todo is created and returned with 201 status, with priority "medium", dueDate null, and tags []

#### Scenario: Create with enrichment fields
- **WHEN** POST /api/todos is called with title, priority, dueDate, and tags
- **THEN** the todo is created with those values and returned with 201 status

#### Scenario: Create with empty title
- **WHEN** POST /api/todos is called with empty or missing title
- **THEN** 400 status with error message is returned

#### Scenario: Create with invalid priority
- **WHEN** POST /api/todos is called with a priority outside low|medium|high
- **THEN** 400 status listing the allowed values is returned

#### Scenario: Create with invalid due date
- **WHEN** POST /api/todos is called with a dueDate that is not a YYYY-MM-DD string or null
- **THEN** 400 status with error message is returned

#### Scenario: Create with invalid tags
- **WHEN** POST /api/todos is called with tags that is not an array of non-empty strings
- **THEN** 400 status with error message is returned

#### Scenario: Tags are normalized
- **WHEN** POST /api/todos is called with tags containing surrounding whitespace or duplicates
- **THEN** the stored tags are trimmed and deduplicated

### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update an existing todo, validating priority, dueDate, and tags when present.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update enrichment fields
- **WHEN** PUT /api/todos/:id is called with priority, dueDate, or tags
- **THEN** the provided fields are validated, updated, and persisted

#### Scenario: Update with invalid enrichment values
- **WHEN** PUT /api/todos/:id is called with an invalid priority, dueDate format, or tags value
- **THEN** 400 status with error message is returned and the todo is unchanged

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

### Requirement: Delete Todo Endpoint
The API SHALL provide an endpoint to delete a todo.

#### Scenario: Delete existing todo
- **WHEN** DELETE /api/todos/:id is called with valid ID
- **THEN** the todo is deleted and success response returned

#### Scenario: Delete non-existent todo
- **WHEN** DELETE /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

