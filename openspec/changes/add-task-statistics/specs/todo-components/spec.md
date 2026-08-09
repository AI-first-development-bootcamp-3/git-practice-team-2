## MODIFIED Requirements

### Requirement: TodoList Component
The TodoList component SHALL display todos grouped by status.

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** message "No todos yet. Add one above!" is shown

#### Scenario: Grouped display
- **WHEN** todos exist
- **THEN** they are grouped into "To Do", "In Progress", "Review", and "Done" sections

#### Scenario: Section counts
- **WHEN** sections are displayed
- **THEN** each section header shows item count

### Requirement: TodoItem Component
The TodoItem component SHALL display a single todo with actions.

#### Scenario: Display todo
- **WHEN** todo is rendered
- **THEN** title, status selector, and delete button are shown

#### Scenario: Done styling
- **WHEN** todo status is done
- **THEN** title has strikethrough and opacity is reduced

#### Scenario: Status change action
- **WHEN** a new status is chosen from the status selector
- **THEN** onStatusChange callback is invoked with the todo ID and the new status

#### Scenario: Delete action
- **WHEN** delete button is clicked
- **THEN** onDelete callback is invoked with todo ID

## ADDED Requirements

### Requirement: Navigation
The App component SHALL provide navigation between the Todos page and the Statistics page.

#### Scenario: Link to statistics
- **WHEN** the Todos page is displayed
- **THEN** a link to navigate to the Statistics page is visible

#### Scenario: Link back to todos
- **WHEN** the Statistics page is displayed
- **THEN** a link to navigate back to the Todos page is visible
