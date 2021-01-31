import "../stylesheets/Note.css";
import "../stylesheets/Modal.css";
import React from "react";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  handleDeleteNote(event) {
    event.stopPropagation()
    this.props.onDeleteNote(this.props.id);
  }

  handleNoteClick() {
    const id = this.props.id;
    const title = this.props.title;
    const description = this.props.description;
    const dateCreated = this.props.dateCreated;
    this.props.onNoteClick(id, title, description, dateCreated);
  }

  render() {
    const dateCreated = this.props.formatDate(this.props.dateCreated);
    let lastModified;
    if (this.props.lastModified) {
      lastModified = this.props.formatDate(this.props.lastModified);
    }

    if (!this.props.deleted) {
      return (
        <div className="note" onClick={() => this.handleNoteClick()}>
          <h2>{dateCreated}</h2>
          <button className='delete' onClick={event => {this.handleDeleteNote(event)}}>del</button>
          <h4>{lastModified ? "last modified: " + lastModified : ""}</h4>
          <h1>{this.props.title ? this.props.title : "<no title>"}</h1>
          <p>{this.props.description}</p>
        </div>
      );
    }
  }
}

export default Note;
