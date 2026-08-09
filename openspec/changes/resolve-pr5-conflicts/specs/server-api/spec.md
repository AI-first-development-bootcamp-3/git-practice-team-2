## MODIFIED Requirements

### Requirement: Create Todo Endpoint
The API SHALL provide an endpoint to create a new todo, accepting optional status, priority, dueDate, and tags.

#### Scenario: Create with valid title
- **WHEN** POST /api/todos is called with title in body
- **THEN** new todo is created and returned with 201 status, with status "todo", priority "medium", dueDate null, and tags []

#### Scenario: Create with explicit status
- **WHEN** POST /api/todos is called with title and a status of todo, in-progress, review, or done
- **THEN** the todo is created with that status and returned with 201 status

#### Scenario: Create with invalid status
- **WHEN** POST /api/todos is called with a status outside todo|in-progress|review|done
- **THEN** 400 status with error message is returned

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
The API SHALL provide an endpoint to update an existing todo, validating status, priority, dueDate, and tags when present. Existence SHALL be checked before body validation, so a non-existent id always yields 404 regardless of body validity.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update status
- **WHEN** PUT /api/todos/:id is called with a status of todo, in-progress, review, or done
- **THEN** the todo's status is updated and persisted

#### Scenario: Update with invalid status
- **WHEN** PUT /api/todos/:id is called for an existing todo with a status outside todo|in-progress|review|done
- **THEN** 400 status with error message is returned and the todo is unchanged

#### Scenario: Update enrichment fields
- **WHEN** PUT /api/todos/:id is called with priority, dueDate, or tags
- **THEN** the provided fields are validated, updated, and persisted

#### Scenario: Update with invalid enrichment values
- **WHEN** PUT /api/todos/:id is called for an existing todo with an invalid priority, dueDate format, or tags value
- **THEN** 400 status with error message is returned and the todo is unchanged

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

#### Scenario: 404 takes precedence over validation errors
- **WHEN** PUT /api/todos/:id is called with a non-existent id and an invalid status or invalid enrichment values in the body
- **THEN** 404 status is returned, not 400
