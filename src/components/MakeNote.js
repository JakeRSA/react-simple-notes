import React from "react";
import Note from "./Note";
import "../stylesheets/MakeNote.css";

class MakeNote extends React.Component {
  constructor(props) {
    super(props);
    this.notes = [];
    this.state = {
      description: "",
      count: 1,
    };
  }

  onDescriptionChange(event) {
    const value = event.target.value;
    this.setState({ description: value });
  }

  addNote(description) {
    const dateTime = new Date();
    const note = {
      dateTime: dateTime,
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
        description={note.description}
      />
    ));
    return (
      <div className="app-wrapper">
        <div className="make-note">
          <textarea
            value={this.state.description}
            onChange={(event) => this.onDescriptionChange(event)}
          ></textarea>
          <button
            onClick={() => {
              this.addNote(this.state.description);
            }}
          >
            add
          </button>
        </div>
        <div className="note-container">{noteElems}</div>
      </div>
    );
  }
}

export default MakeNote;
