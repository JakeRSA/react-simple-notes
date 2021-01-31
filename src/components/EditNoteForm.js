import React from "react";

class EditNoteForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleAllowEdit.bind(this);
    this.handleEditDescription.bind(this);
    this.handleEditTitle.bind(this);
  }

  handleAllowEdit(event) {
    this.props.onAllowEdit(event);
  }

  handleEditTitle(event) {
    this.props.onTitleChange(event.target.value);
  }

  handleEditDescription(event) {
    this.props.onDescriptionChange(event.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="modal-title"
          type="text"
          placeholder={this.props.title || "untitled note"}
          onChange={(event) => {
            this.handleEditTitle(event);
          }}
          value={this.props.title}
          disabled={!this.props.canEdit}
        ></input>
        <h2 className="date-created">date created: {this.props.dateCreated}</h2>
        <textarea
          className="modal-description"
          rows={20}
          placeholder={this.props.description}
          onChange={(event) => {
            this.handleEditDescription(event);
          }}
          value={this.props.description}
          disabled={!this.props.canEdit}
        ></textarea>
        <button
          className={
            this.props.canEdit ? "allow-edit-btn hide" : "allow-edit-btn"
          }
          onClick={(event) => {
            this.handleAllowEdit(event);
          }}
        >
          edit note
        </button>
        <button
          className={
            this.props.canEdit ? "save-changes-btn" : "save-changes-btn hide"
          }
          type="submit"
          onClick={this.props.onSubmitEdits}
        >
          confirm
        </button>
        <button
          className={
            this.props.canEdit
              ? "cancel-changes-btn"
              : "cancel-changes-btn hide"
          }
          type="submit"
          onClick={this.props.onCancelEdits}
        >
          cancel
        </button>
      </form>
    );
  }
}

export default EditNoteForm;
