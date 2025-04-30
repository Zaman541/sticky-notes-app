import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add Note</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </div>
    </Router>
  );
}

function Dashboard() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleDelete = id => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="dashboard">
      <h2>Your Sticky Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available. Click 'Add Note' to get started.</p>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
            <div className="note" key={note.id}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <div className="note-actions">
                <Link to={`/edit/${note.id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(note.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      setSuccess('');
      return;
    }
    const newNote = {
      id: uuidv4(),
      title,
      content
    };
    const stored = JSON.parse(localStorage.getItem('notes')) || [];
    stored.push(newNote);
    localStorage.setItem('notes', JSON.stringify(stored));
    setTitle('');
    setContent('');
    setError('');
    setSuccess('Note added successfully!');
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="add-note">
      <h2>Add a New Note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

function EditNote() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = storedNotes.find(note => note.id === id);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      setSuccess('');
      return;
    }
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = storedNotes.map(note =>
      note.id === id ? { ...note, title, content } : note
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setError('');
    setSuccess('Note updated successfully!');
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="add-note">
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit">Update Note</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default App;
