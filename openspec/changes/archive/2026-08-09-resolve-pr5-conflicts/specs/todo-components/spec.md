## MODIFIED Requirements

### Requirement: TodoList Component
The TodoList component SHALL display todos grouped by status into four sections.

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** message "No todos yet. Add one above!" is shown

#### Scenario: Grouped display
- **WHEN** todos exist
- **THEN** they are grouped into "To Do", "In Progress", "Review", and "Done" sections by status

#### Scenario: Section counts
- **WHEN** sections are displayed
- **THEN** each section header shows item count

### Requirement: TodoItem Component
The TodoItem component SHALL display a single todo with a status selector, its enrichment metadata, and actions.

#### Scenario: Display todo
- **WHEN** todo is rendered
- **THEN** title, status dropdown, priority badge, and delete button are shown, plus due date and tag chips when set

#### Scenario: Status change
- **WHEN** the user selects a different status (To Do, In Progress, Review, Done) in the dropdown
- **THEN** the change is saved via the API and the todo moves to the matching section

#### Scenario: Priority badge
- **WHEN** a todo is rendered
- **THEN** a badge shows its priority with a distinct color per level (low, medium, high)

#### Scenario: Change priority
- **WHEN** the user selects a different priority on an existing todo
- **THEN** the change is saved via the API and the badge updates

#### Scenario: Due date display
- **WHEN** a todo has a dueDate
- **THEN** the date is shown on the item

#### Scenario: Overdue styling
- **WHEN** a todo's dueDate is before today and its status is not done
- **THEN** the item is visually marked as overdue

#### Scenario: Tag chips
- **WHEN** a todo has tags
- **THEN** each tag renders as a colored chip, with the same tag name always producing the same color

#### Scenario: Edit tags
- **WHEN** the user adds or removes a tag on an existing todo
- **THEN** the change is saved via the API and the chips update

#### Scenario: Done styling
- **WHEN** todo status is done
- **THEN** title has strikethrough and opacity is reduced

#### Scenario: Delete action
- **WHEN** delete button is clicked
- **THEN** onDelete callback is invoked with todo ID

### Requirement: Tag Filtering
The task list SHALL support filtering by a tag selected from any task's chips, across all status sections.

#### Scenario: Filter by chip click
- **WHEN** the user clicks a tag chip
- **THEN** only todos carrying that tag are shown in every status section, with an indication of the active filter

#### Scenario: Clear filter
- **WHEN** the user clears the active tag filter
- **THEN** all todos are shown again
