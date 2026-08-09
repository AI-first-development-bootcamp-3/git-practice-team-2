import React from 'react';

const STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

function TodoItem({ todo, onStatusChange, onDelete }) {
  return (
    <div className={`todo-item ${todo.status === 'done' ? 'done' : ''}`}>
      <select
        className="status-select"
        value={todo.status}
        onChange={(e) => onStatusChange(todo.id, e.target.value)}
        aria-label="Change status"
      >
        {STATUSES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <span className="todo-title">{todo.title}</span>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
