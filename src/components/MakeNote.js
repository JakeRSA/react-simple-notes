import React from "react";
import "../stylesheets/MakeNote.css";

class MakeNote extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.props.onTitleChange(event.target.value);
  }

  handleDescriptionChange(event) {
    this.props.onDescriptionChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
    this.props.onIncrementId();
  }

  addNote() {
    const dateTime = new Date();
    const note = {
      dateTime: dateTime,
      title: this.props.title,
      description: this.props.description,
      id: this.props.id,
    };
    this.notes.push(note);
    this.setState({
      count: this.state.count + 1,
      description: "",
    });
  }

  render() {
    return (
      <form className="make-note">
        <input
          className="title-input"
          placeholder="Title (if you want but no big deal)"
          value={this.props.title}
          onChange={this.handleTitleChange}
        ></input>
        <textarea
          required
          className="description-text-area"
          placeholder="Enter note body here..."
          value={this.props.description}
          onChange={this.handleDescriptionChange}
        ></textarea>
        <button
          type="submit"
          onClick={(event) => {
            if (this.props.description) this.handleSubmit(event);
          }}
        >
          add
        </button>
      </form>
    );
  }
}

export default MakeNote;
