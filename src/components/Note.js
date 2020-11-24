import "../stylesheets/Note.css";
import "../stylesheets/Modal.css";
import React from "react";
import Modal from "react-modal";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      deleted: false,
      title: props.title,
      description: props.description,
      allowTitleEdit: false,
      allowDescEdit: false,
      date: this.formatDate(props.dateTime),
    };
  }

  formatDate(dt) {
    const yyyy = dt.getFullYear();
    let mm;
    if (dt.getMonth() > 9) mm = dt.getMonth();
    else mm = "0" + dt.getMonth();
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

  deleteNote() {
    const userResponse = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (userResponse) {
      this.setState({ deleted: true });
    }
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  editTitle(event) {
    this.setState({
      title: event.target.value,
      date: this.formatDate(new Date()),
    });
  }
  editDescription(event) {
    this.setState({
      description: event.target.value,
      date: this.formatDate(new Date()),
    });
  }

  toggleTitleEdit() {
    this.setState({ allowTitleEdit: !this.state.allowTitleEdit });
  }

  toggleDescriptionEdit() {
    this.setState({ allowDescEdit: !this.state.allowDescEdit });
  }

  render() {
    if (!this.state.deleted) {
      return (
        <div className="note-container">
          <Modal className="note-modal" isOpen={this.state.isOpen}>
            <button onClick={() => this.closeModal()}>esc</button>
            <textarea
              readOnly={!this.state.allowTitleEdit}
              onChange={(e) => this.editTitle(e)}
            >
              {this.state.title || "untitled note"}
            </textarea>
            <button onClick={() => this.toggleTitleEdit()}>
              {this.state.allowTitleEdit ? "done" : "edit title"}
            </button>
            <h2>last modified: {this.dateFormatted}</h2>
            <div className="modal-description-box">
              <textarea
                readOnly={!this.state.allowDescEdit}
                onChange={(e) => this.editDescription(e)}
              >
                {this.state.description}
              </textarea>
              <button onClick={() => this.toggleDescriptionEdit()}>
                {this.state.allowDescEdit ? "done" : "edit description"}
              </button>
            </div>
          </Modal>
          <div className="note" onClick={() => this.openModal()}>
            <h2>{this.state.date}</h2>
            <button
              onClick={() => {
                this.deleteNote();
              }}
            >
              del
            </button>
            <h1>{this.state.title && this.state.title}</h1>
            <h1>{!this.state.title && "<no title>"}</h1>
            <p>{this.state.description}</p>
          </div>
        </div>
      );
    } else return <div className="deleted"></div>;
  }
}

export default Note;
