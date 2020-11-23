import React from "react";
import Note from "./Note";
import "../stylesheets/MakeNote.css";

class MakeNote extends React.Component {
  constructor(props) {
    super(props);
    this.notes = [];
    this.state = {
      title: "",
      description: "",
      count: 1,
    };
  }

  onDescriptionChange(event) {
    const value = event.target.value;
    this.setState({ description: value });
  }

  onTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  addNote() {
    const dateTime = new Date();
    const note = {
      dateTime: dateTime,
      title: this.state.title,
      description: this.state.description,
      count: this.state.count,
    };
    this.notes.push(note);
    this.setState({
      count: this.state.count + 1,
      description: "",
    });
  }

  render() {
    const noteElems = this.notes.map((note) => (
      <Note
        key={note.count}
        dateTime={note.dateTime}
        title={note.title}
        description={note.description}
      />
    ));
    return (
      <div className="app-wrapper">
        <form className="make-note">
          <textarea
            className="titleTextArea"
            placeholder="Title (if you want but no big deal)"
            value={this.state.title}
            onChange={(event) => this.onTitleChange(event)}
          ></textarea>
          <textarea
            className="descriptionTextArea"
            placeholder="Enter note body here..."
            value={this.state.description}
            onChange={(event) => this.onDescriptionChange(event)}
          ></textarea>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (this.state.description) this.addNote();
              else {
                window.alert(
                  "You can't make an empty note. Why would you even want to do that?"
                );
              }
            }}
          >
            add
          </button>
        </form>
        <div className="note-container">{noteElems}</div>
      </div>
    );
  }
}

export default MakeNote;
