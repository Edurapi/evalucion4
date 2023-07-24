import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);

  useEffect(() => {
    // Cargar las notas almacenadas en Local Storage al cargar la página
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    // Guardar las notas en Local Storage cada vez que cambian
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (description.trim() !== '') {
      const newNote = {
        title: title.trim(),
        description: description.trim(),
        important: important,
      };

      setNotes([...notes, newNote]);
      setTitle('');
      setDescription('');
      setImportant(false);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>Notas Adhesivas</h1>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div key={index} className={`note ${note.important ? 'important' : ''}`}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(index)}>Eliminar</button>
          </div>
        ))}
      </div>
      <div className="note-form">
        <h2>Agregar Nota</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>
          <input
            type="checkbox"
            checked={important}
            onChange={() => setImportant(!important)}
          />
          Importante
        </label>
        <button onClick={addNote}>Agregar</button>
      </div>
    </div>
  );
}

export default App;
