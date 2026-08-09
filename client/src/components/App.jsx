import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { api } from '../services/api';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Stats from './Stats';
import '../App.css';

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTag, setFilterTag] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await api.todos.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ title, priority, dueDate, tags }) => {
    try {
      const newTodo = await api.todos.create({ title, priority, dueDate, tags });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await api.todos.update(id, { status: newStatus });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await api.todos.update(id, updates);
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.todos.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
        <nav className="nav">
          <Link to="/stats" className="nav-link">
            Statistics →
          </Link>
        </nav>
      </header>

      <main className="main">
        <AddTodo onAdd={handleAdd} />

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>x</button>
          </div>
        )}

        {filterTag && (
          <div className="active-filter">
            Filtering by: <strong>{filterTag}</strong>
            <button onClick={() => setFilterTag(null)} className="clear-filter-btn">Clear</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TodoList
            todos={filterTag ? todos.filter(t => (t.tags || []).includes(filterTag)) : todos}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onTagClick={(tag) => setFilterTag(tag)}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodosPage />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;
