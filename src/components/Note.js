import "../stylesheets/Note.css";
import React from "react";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
    };
    const dt = props.dateTime;

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

    this.dateFormatted = `${yyyy}-${mm}-${dd} ${hr}:${mn}:${sc}`;
  }
  deleteNote() {
    const userResponse = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (userResponse) {
      this.setState({ deleted: true });
    }
  }

  render() {
    if (!this.state.deleted) {
      return (
        <div className="note">
          <h2>{this.dateFormatted}</h2>
          <button
            onClick={() => {
              this.deleteNote();
            }}
          >
            del
          </button>
          <p>{this.props.description}</p>
        </div>
      );
    } else return <div className="deleted"></div>;
  }
}

export default Note;
