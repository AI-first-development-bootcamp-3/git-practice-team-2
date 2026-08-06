import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const STATUS_LABELS = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await api.todos.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Statistics</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">
            ← Todos
          </Link>
        </nav>
      </header>

      <main className="main">
        {loading && <div className="loading">Loading...</div>}

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>x</button>
          </div>
        )}

        {!loading && !error && stats && (
          <div className="stats">
            <div className="stats-total">
              <span className="stats-total-label">Total tasks</span>
              <span className="stats-total-value">{stats.total}</span>
            </div>

            <ul className="stats-by-status">
              {STATUS_LABELS.map(({ key, label }) => (
                <li key={key} className="stats-row">
                  <span className="stats-label">{label}</span>
                  <span className="stats-value">{stats.byStatus[key] ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default Stats;
