import React from 'react';
import TodoItem from './TodoItem';

const SECTIONS = [
  { status: 'todo', title: 'To Do' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'review', title: 'Review' },
  { status: 'done', title: 'Done' },
];

function TodoList({ todos, onStatusChange, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {SECTIONS.map(({ status, title }) => {
        const sectionTodos = todos.filter((t) => t.status === status);
        return (
          <section key={status} className="todo-section">
            <h2>
              {title} ({sectionTodos.length})
            </h2>
            {sectionTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
