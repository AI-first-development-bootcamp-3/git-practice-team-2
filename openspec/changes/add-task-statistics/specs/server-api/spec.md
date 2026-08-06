## MODIFIED Requirements

### Requirement: Update Todo Endpoint
The API SHALL provide an endpoint to update an existing todo.

#### Scenario: Update existing todo
- **WHEN** PUT /api/todos/:id is called with updates
- **THEN** the todo is updated and returned

#### Scenario: Update non-existent todo
- **WHEN** PUT /api/todos/:id is called with invalid ID
- **THEN** 404 status with error message is returned

#### Scenario: Update with invalid status
- **WHEN** PUT /api/todos/:id is called with a status value outside todo|in-progress|review|done
- **THEN** 400 status with error message is returned

## ADDED Requirements

### Requirement: Statistics Endpoint
The API SHALL provide an endpoint to retrieve aggregate task counts.

#### Scenario: Get stats
- **WHEN** GET /api/todos/stats is called
- **THEN** a JSON object is returned with the total task count and a count for each of todo, in-progress, review, and done

#### Scenario: Get stats with no todos
- **WHEN** GET /api/todos/stats is called and no todos exist
- **THEN** total is 0 and each status count is 0
