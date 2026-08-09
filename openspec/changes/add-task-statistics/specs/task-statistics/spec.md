## Purpose

Gives users a dedicated view of aggregate task data — total count and counts per status — so workload distribution across todo, in-progress, review, and done is visible at a glance.

## ADDED Requirements

### Requirement: Statistics Page
The client SHALL provide a Statistics page reachable via navigation from the main Todos page.

#### Scenario: Navigate to statistics page
- **WHEN** user clicks the "Statistics" nav link from the Todos page
- **THEN** the Statistics page is displayed at route /stats

#### Scenario: Navigate back to todos
- **WHEN** user clicks the nav link back to Todos from the Statistics page
- **THEN** the Todos page is displayed at route /

### Requirement: Total Task Count Display
The Statistics page SHALL display the total number of tasks across all statuses.

#### Scenario: Display total count
- **WHEN** the Statistics page loads successfully
- **THEN** the total number of tasks is shown

### Requirement: Count By Status Display
The Statistics page SHALL display the count of tasks for each status: todo, in-progress, review, and done.

#### Scenario: Display per-status counts
- **WHEN** the Statistics page loads successfully
- **THEN** a count is shown for each of todo, in-progress, review, and done

#### Scenario: Zero count for empty status
- **WHEN** no tasks exist for a given status
- **THEN** that status is shown with a count of 0, not omitted from the display

### Requirement: Stats Loading and Error States
The Statistics page SHALL show a loading indicator while fetching stats and an error message if the fetch fails.

#### Scenario: Loading state
- **WHEN** the Statistics page is fetching stats
- **THEN** a loading indicator is shown

#### Scenario: Error state
- **WHEN** the stats request fails
- **THEN** an error message is displayed
