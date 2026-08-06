import React from 'react';
import { PRIORITY_LEVELS, PRIORITY_OPTIONS } from '../constants';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const pri = PRIORITY_LEVELS[todo.priority] || PRIORITY_LEVELS.medium;
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = todo.dueDate && todo.dueDate < today && todo.status !== 'done';

  return (
    <div className={`todo-item ${todo.status === 'done' ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.status === 'done' ? 'Mark as pending' : 'Mark as done'}
      >
        {todo.status === 'done' ? '✓' : '○'}
      </button>

      <span
        className="priority-badge"
        style={{ background: pri.color }}
        title={pri.label}
      >
        {pri.icon} {pri.label}
      </span>

      <span className="todo-title">{todo.title}</span>

      {todo.dueDate && (
        <span className={`due-date ${isOverdue ? 'due-date-overdue' : ''}`}>
          {todo.dueDate}
        </span>
      )}

      <select
        className="priority-select-inline"
        value={todo.priority}
        onChange={(e) => onUpdate(todo.id, { priority: e.target.value })}
      >
        {PRIORITY_OPTIONS.map(p => (
          <option key={p} value={p}>{PRIORITY_LEVELS[p].label}</option>
        ))}
      </select>

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
