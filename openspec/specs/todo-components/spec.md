# todo-components Specification

## Purpose
TBD - created by archiving change add-todo-components. Update Purpose after archive.
## Requirements
### Requirement: App Component
The App component SHALL manage todo state and coordinate child components.

#### Scenario: Initial load
- **WHEN** app mounts
- **THEN** todos are fetched from API and displayed

#### Scenario: Loading state
- **WHEN** todos are being fetched
- **THEN** loading indicator is shown

#### Scenario: Error display
- **WHEN** API error occurs
- **THEN** error message is displayed with dismiss button

### Requirement: TodoList Component
The TodoList component SHALL display todos grouped by status.

#### Scenario: Empty state
- **WHEN** no todos exist
- **THEN** message "No todos yet. Add one above!" is shown

#### Scenario: Grouped display
- **WHEN** todos exist
- **THEN** they are grouped into "To Do" and "Done" sections

#### Scenario: Section counts
- **WHEN** sections are displayed
- **THEN** each section header shows item count

### Requirement: TodoItem Component
The TodoItem component SHALL display a single todo with its enrichment metadata and actions.

#### Scenario: Display todo
- **WHEN** todo is rendered
- **THEN** title, priority badge, toggle button, and delete button are shown, plus due date and tag chips when set

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

#### Scenario: Toggle action
- **WHEN** toggle button is clicked
- **THEN** onToggle callback is invoked with todo ID

#### Scenario: Delete action
- **WHEN** delete button is clicked
- **THEN** onDelete callback is invoked with todo ID

### Requirement: AddTodo Component
The AddTodo component SHALL provide a form to create new todos with optional priority, due date, and tags.

#### Scenario: Form submission
- **WHEN** form is submitted with non-empty title
- **THEN** onAdd callback is invoked with title, selected priority, due date, and tags, and the form is cleared

#### Scenario: Priority selection
- **WHEN** the form is displayed
- **THEN** a priority selector is available, defaulting to "medium"

#### Scenario: Due date selection
- **WHEN** the user picks a date in the optional date input
- **THEN** the created todo carries that dueDate

#### Scenario: Tag entry
- **WHEN** the user types a tag name and confirms (Enter)
- **THEN** the tag appears as a removable chip on the form and is included on submit

#### Scenario: Empty validation
- **WHEN** input is empty
- **THEN** add button is disabled

### Requirement: Tag Filtering
The task list SHALL support filtering by a tag selected from any task's chips.

#### Scenario: Filter by chip click
- **WHEN** the user clicks a tag chip
- **THEN** only todos carrying that tag are shown, with an indication of the active filter

#### Scenario: Clear filter
- **WHEN** the user clears the active tag filter
- **THEN** all todos are shown again

### Requirement: Visual Design
The UI SHALL follow a clean, minimal design with consistent styling.

#### Scenario: Brand header
- **WHEN** app is displayed
- **THEN** header has blue background (#4361ee) with title

#### Scenario: Interactive feedback
- **WHEN** user hovers over todo item
- **THEN** shadow increases and delete button appears

#### Scenario: Responsive layout
- **WHEN** app is viewed
- **THEN** content is centered with max-width of 600px

