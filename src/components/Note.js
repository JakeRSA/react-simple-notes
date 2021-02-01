import "../stylesheets/Note.css";
import "../stylesheets/Modal.css";
import React from "react";
import NoteModal from "./NoteModal";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.state = {
      showModal: false,
    };
  }

  handleDeleteNote(event) {
    event.stopPropagation();
    this.props.onDeleteNote(this.props.id);
  }

  handleNoteClick() {
    this.props.onOpenForEdit(this.props.title, this.props.description);
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const dateCreated = this.props.formatDate(this.props.dateCreated);
    let lastModified;
    if (this.props.lastModified) {
      lastModified = this.props.formatDate(this.props.lastModified);
    }

    if (!this.props.deleted) {
      return (
        <div>
          <NoteModal
            isOpen={this.state.showModal}
            onCloseModal={() => {
              this.handleCloseModal();
            }}
            id={this.props.id}
            dateCreated={this.props.formatDate(this.props.dateCreated)}
            origTitle={this.props.title}
            title={this.props.editingTitle}
            onEditTitle={(title) => {
              this.props.onEditTitle(title);
            }}
            origDescription={this.props.description}
            description={this.props.editingDescription}
            onEditDescription={(description) => {
              this.props.onEditDescription(description);
            }}
            onCancelEdits={(title, description) => {
              this.props.onCancelEdits(title, description);
            }}
            onSubmitEdits={(event, id) => {
              this.props.onSubmitEdits(event, id);
            }}
          />
          <div className="note" onClick={() => this.handleNoteClick()}>
            <h2>{dateCreated}</h2>
            <button
              className="delete"
              onClick={(event) => {
                this.handleDeleteNote(event);
              }}
            >
              del
            </button>
            <h4>{lastModified ? "last modified: " + lastModified : ""}</h4>
            <h1>{this.props.title ? this.props.title : "<no title>"}</h1>
            <p>{this.props.description}</p>
          </div>
        </div>
      );
    }
  }
}

export default Note;
