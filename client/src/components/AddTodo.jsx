import React, { useState } from 'react';
import { PRIORITY_LEVELS, PRIORITY_OPTIONS, getTagColor } from '../constants';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title: title.trim(), priority, dueDate: dueDate || null, tags });
      setTitle('');
      setPriority('medium');
      setDueDate('');
      setTags([]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
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
      <div className="tag-input-row">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Add tag (Enter)"
          className="tag-input"
        />
        {tags.map(tag => (
          <span key={tag} className="tag-chip" style={{ background: getTagColor(tag) }}>
            {tag}
            <button type="button" className="tag-remove" onClick={() => removeTag(tag)}>x</button>
          </span>
        ))}
      </div>
    </form>
  );
}

export default AddTodo;
