import "./App.css";
import "./stylesheets/MakeNote.css";
import MakeNote from "./components/MakeNote";
import Note from "./components/Note";
import EditNoteForm from "./components/EditNoteForm";
import React from "react";
import { Modal } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      id: 0,
      notes: [],
      modal: {
        isOpen: false,
        dateCreated: "",
        title: "",
        description: "",
        id: null,
        canEdit: false,
      },
      edits: {
        title: "",
        description: "",
      },
    };
  }

  formatDate(dt) {
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
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  handleDescriptionChange(description) {
    this.setState({ description });
  }

  handleNextId() {
    this.setState({ id: this.state.id + 1 });
  }

  handleMakeNote() {
    const title = this.state.title;
    const description = this.state.description;
    if (!description) {
      return 1;
    }
    const dateCreated = new Date();
    const id = this.state.id;
    const note = { id, title, description, dateCreated };
    this.setState({
      notes: [note, ...this.state.notes],
      title: "",
      description: "",
    });
  }

  handleDeleteNote(id) {
    const userResponse = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (userResponse) {
      let newNotes = [];
      for (let note of this.state.notes) {
        if (note.id !== id) {
          newNotes.push(note);
        }
      }
      this.setState({ notes: newNotes });
    }
  }

  handleNoteClick(id, title, description, dateCreated) {
    this.setState({
      modal: {
        isOpen: true,
        title: title,
        description: description,
        id: id,
        dateCreated: this.formatDate(dateCreated),
        canEdit: false,
      },
      edits: {
        title: title,
        description: description,
      },
    });
  }

  allowNoteEdit(event) {
    event.preventDefault();
    this.setState({
      modal: {
        isOpen: true,
        id: this.state.modal.id,
        title: this.state.modal.title,
        description: this.state.modal.description,
        dateCreated: this.state.modal.dateCreated,
        canEdit: true,
      },
    });
  }

  handleEditTitle(title) {
    this.setState({
      edits: {
        title: title,
        description: this.state.edits.description,
      },
    });
  }

  handleEditDescription(description) {
    this.setState({
      edits: {
        title: this.state.edits.title,
        description: description,
      },
    });
  }

  handleSubmitEdits(event) {
    event.preventDefault();
    this.setState({
      modal: {
        isOpen: true,
        id: this.state.modal.id,
        title: this.state.edits.title,
        description: this.state.edits.description,
        dateCreated: this.state.modal.dateCreated,
        canEdit: false,
      },
      edits: {
        title: "",
        description: "",
      },
    });
    const origNotes = this.state.notes;
    let newNotes = [];
    for (let note of origNotes) {
      if (note.id === this.state.modal.id) {
        const editedNote = {
          id: note.id,
          title: this.state.edits.title,
          description: this.state.edits.description,
          dateCreated: note.dateCreated,
          lastModified: new Date(),
        };
        newNotes.push(editedNote);
      } else {
        newNotes.push(note);
      }
    }
    this.setState({ notes: newNotes });
  }

  handleCancelEdits(event) {
    event.preventDefault();
    this.setState({
      modal: {
        isOpen: true,
        id: this.state.modal.id,
        title: this.state.modal.title,
        description: this.state.modal.description,
        dateCreated: this.state.modal.dateCreated,
        canEdit: false,
      },
      edits: {
        title: this.state.modal.title,
        description: this.state.modal.description,
      },
    });
  }

  closeModal() {
    this.setState({ modal: { isOpen: false } });
  }

  render() {
    const noteElems = this.state.notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        dateCreated={note.dateCreated}
        lastModified={note.lastModified}
        title={note.title}
        description={note.description}
        onDeleteNote={(id) => {
          this.handleDeleteNote(id);
        }}
        onNoteClick={(id, title, description, dateCreated) => {
          this.handleNoteClick(id, title, description, dateCreated);
        }}
        formatDate={this.formatDate}
      />
    ));
    return (
      <div className="container">
        <Modal
          show={this.state.modal.isOpen}
          className="note-modal"
          onHide={() => {
            this.closeModal();
          }}
        >
          <Modal.Header>
            <div className="modal-header">

            <button
              className="del-btn"
              onClick={() => {
                this.closeModal();
              }}
              >
              esc
            </button>
              </div>
          </Modal.Header>
          <Modal.Body>
            <EditNoteForm
              title={this.state.edits.title}
              description={this.state.edits.description}
              dateCreated={this.state.modal.dateCreated}
              canEdit={this.state.modal.canEdit}
              onAllowEdit={(event) => {
                this.allowNoteEdit(event);
              }}
              onTitleChange={(title) => {
                this.handleEditTitle(title);
              }}
              onDescriptionChange={(description) => {
                this.handleEditDescription(description);
              }}
              onSubmitEdits={(event) => {
                this.handleSubmitEdits(event);
              }}
              onCancelEdits={(event) => {
                this.handleCancelEdits(event);
              }}
            ></EditNoteForm>
          </Modal.Body>
        </Modal>

        <h1 className="main-header">my notes</h1>
        <MakeNote
          title={this.state.title}
          description={this.state.description}
          id={this.state.id}
          onTitleChange={(title) => this.handleTitleChange(title)}
          onDescriptionChange={(description) => {
            this.handleDescriptionChange(description);
          }}
          onIncrementId={() => this.handleNextId()}
          onSubmit={(note) => this.handleMakeNote(note)}
        />
        <div className="note-container">{noteElems}</div>
      </div>
    );
  }
}

export default App;
