import React, { useState } from 'react';
import { PRIORITY_LEVELS, PRIORITY_OPTIONS } from '../constants';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title: title.trim(), priority, dueDate: dueDate || null });
      setTitle('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="add-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        {PRIORITY_OPTIONS.map(p => (
          <option key={p} value={p}>{PRIORITY_LEVELS[p].label}</option>
        ))}
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
      />
      <button type="submit" className="add-btn" disabled={!title.trim()}>
        Add
      </button>
    </form>
  );
}

export default AddTodo;
