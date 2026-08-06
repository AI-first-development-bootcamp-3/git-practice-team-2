## MODIFIED Requirements

### Requirement: Todo Data Model
Each todo SHALL have an id, title, status, createdAt, and updatedAt fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id (UUID), title (string), status (todo|in-progress|review|done), createdAt (ISO date), updatedAt (ISO date)

#### Scenario: Default status
- **WHEN** a todo is created without status
- **THEN** status defaults to "todo"

#### Scenario: Reject invalid status
- **WHEN** a todo is created or updated with a status value outside todo|in-progress|review|done
- **THEN** the operation is rejected with an error

## ADDED Requirements

### Requirement: Aggregate Status Counts
The service SHALL provide a way to compute the total todo count and the count of todos per status.

#### Scenario: Compute counts
- **WHEN** stats are requested
- **THEN** the total count and a count for each of todo, in-progress, review, and done are returned

#### Scenario: Compute counts with no todos
- **WHEN** stats are requested and no todos exist
- **THEN** total is 0 and each status count is 0
