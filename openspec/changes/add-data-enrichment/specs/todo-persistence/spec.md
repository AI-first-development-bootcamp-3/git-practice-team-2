## MODIFIED Requirements

### Requirement: Todo Data Model
Each todo SHALL have an id, title, status, priority, dueDate, tags, createdAt, and updatedAt fields.

#### Scenario: New todo structure
- **WHEN** a todo is created
- **THEN** it has id (UUID), title (string), status (todo|done), priority (low|medium|high), dueDate (YYYY-MM-DD string or null), tags (array of strings), createdAt (ISO date), updatedAt (ISO date)

#### Scenario: Default status
- **WHEN** a todo is created without status
- **THEN** status defaults to "todo"

#### Scenario: Default enrichment fields
- **WHEN** a todo is created without priority, dueDate, or tags
- **THEN** priority defaults to "medium", dueDate to null, and tags to an empty array

#### Scenario: Legacy records
- **WHEN** todos.json contains records saved before the enrichment fields existed
- **THEN** they are returned with defaults applied (priority "medium", dueDate null, tags []) without modifying the stored file until the next write
