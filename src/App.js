import "./App.css";
import "./stylesheets/MakeNote.css";
import MakeNote from "./components/MakeNote";
import Note from "./components/Note";
import React, { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newId, setNewId] = useState(0);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const formatDate = (dt) => {
    const yyyy = dt.getFullYear();
    let mm;
    if (dt.getMonth() >= 9) mm = (dt.getMonth() + 1).toString();
    else mm = "0" + (dt.getMonth() + 1).toString();
    let dd;
    if (dt.getDate() > 9) dd = dt.getDate();
    else dd = "0" + dt.getDate();
    let hr;
    if (dt.getHours() > 9) hr = dt.getHours();
    else hr = "0" + dt.getHours();
    let mn;
    if (dt.getMinutes() > 9) mn = dt.getMinutes();
    else mn = "0" + dt.getMinutes();
    let sc;
    if (dt.getSeconds() > 9) sc = dt.getSeconds();
    else sc = "0" + dt.getSeconds();
    const dateFormatted = `${yyyy}-${mm}-${dd} ${hr}:${mn}:${sc}`;

    return dateFormatted;
  };

  const handleTitleChange = (title) => {
    setNewNoteTitle(title);
  };

  const handleDescriptionChange = (description) => {
    setNewNoteDescription(description);
  };

  const handleNextId = () => {
    setNewId(newId + 1);
  };

  const handleMakeNote = () => {
    const title = newNoteTitle;
    const description = newNoteDescription;
    if (!description) {
      return 1;
    }
    const dateCreated = new Date();
    const id = newId;
    const note = { id, title, description, dateCreated };
    setNotes([note, ...notes]);
    console.log(notes);
  };

  const handleOpenForEdit = (title, description) => {
    setEditingTitle(title);
    setEditingDescription(description);
  };

  const handleDeleteNote = (id) => {
    const userResponse = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (userResponse) {
      let newNotes = [];
      for (let note of notes) {
        if (note.id !== id) {
          newNotes.push(note);
        }
      }
      setNotes(newNotes);
    }
  };

  const handleEditTitle = (title) => {
    setEditingTitle(title);
  };

  const handleEditDescription = (description) => {
    setEditingDescription(description);
  };

  const handleSubmitEdits = (event, id) => {
    event.preventDefault();
    let newNotes = [];
    for (let note of notes) {
      if (note.id === id) {
        const editedNote = {
          id: note.id,
          title: editingTitle,
          description: editingDescription,
          dateCreated: note.dateCreated,
          lastModified: new Date(),
        };
        newNotes.push(editedNote);
      } else {
        newNotes.push(note);
      }
    }
    setNotes(newNotes);
  };

  const handleCancelEdits = (title, description) => {
    setEditingTitle(title);
    setEditingDescription(description);
  };

  const noteElems = notes.map((note) => (
    <Note
      key={note.id}
      id={note.id}
      dateCreated={note.dateCreated}
      lastModified={note.lastModified}
      title={note.title}
      description={note.description}
      onOpenForEdit={(title, description) => {
        handleOpenForEdit(title, description);
      }}
      editingTitle={editingTitle}
      editingDescription={editingDescription}
      onEditTitle={(title) => {
        handleEditTitle(title);
      }}
      onEditDescription={(description) => {
        handleEditDescription(description);
      }}
      onDeleteNote={(id) => {
        handleDeleteNote(id);
      }}
      formatDate={formatDate}
      onCancelEdits={(title, description) => {
        handleCancelEdits(title, description);
      }}
      onSubmitEdits={(event, id) => {
        handleSubmitEdits(event, id);
      }}
    />
  ));
  return (
    <div className="container">
      <h1 className="main-header">my notes</h1>
      <MakeNote
        title={newNoteTitle}
        description={newNoteDescription}
        id={newId}
        onTitleChange={(title) => handleTitleChange(title)}
        onDescriptionChange={(description) => {
          handleDescriptionChange(description);
        }}
        onIncrementId={() => handleNextId()}
        onSubmit={(note) => handleMakeNote(note)}
      />
      <div className="note-container">{noteElems}</div>
    </div>
  );
}

export default App;
