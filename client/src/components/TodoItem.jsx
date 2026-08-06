import React, { useState } from 'react';
import { PRIORITY_LEVELS, PRIORITY_OPTIONS, getTagColor } from '../constants';

function TodoItem({ todo, onToggle, onDelete, onUpdate, onTagClick }) {
  const pri = PRIORITY_LEVELS[todo.priority] || PRIORITY_LEVELS.medium;
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = todo.dueDate && todo.dueDate < today && todo.status !== 'done';
  const [newTag, setNewTag] = useState('');

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

      {todo.tags && todo.tags.length > 0 && (
        <div className="tag-chips">
          {todo.tags.map(tag => (
            <span
              key={tag}
              className="tag-chip"
              style={{ background: getTagColor(tag) }}
              onClick={() => onTagClick && onTagClick(tag)}
            >
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(todo.id, { tags: todo.tags.filter(t => t !== tag) });
                }}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        className="tag-add-inline"
        placeholder="+tag"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const tag = newTag.trim();
            if (tag && !(todo.tags || []).includes(tag)) {
              onUpdate(todo.id, { tags: [...(todo.tags || []), tag] });
            }
            setNewTag('');
          }
        }}
      />

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
