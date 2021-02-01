import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function NoteModal(props) {
  const [canEdit, setCanEdit] = useState(false);

  return (
    <Modal
      show={props.isOpen}
      className="note-modal"
      onHide={() => {
        props.onCloseModal();
      }}
    >
      <Modal.Header>
        <div className="modal-header">
          <button
            className="del-btn"
            onClick={() => {
              props.onCloseModal();
            }}
          >
            esc
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            className="modal-title"
            type="text"
            placeholder={props.title || "untitled note"}
            onChange={(event) => {
              props.onEditTitle(event.target.value);
            }}
            value={props.title}
            disabled={!canEdit}
          ></input>
          <h2 className="date-created">date created: {props.dateCreated}</h2>
          <textarea
            className="modal-description"
            rows={20}
            onChange={(event) => {
              props.onEditDescription(event.target.value);
            }}
            value={props.description}
            disabled={!canEdit}
          ></textarea>
          <span className="form-actions">
            <button
              type="button"
              className={canEdit ? "allow-edit-btn hide" : "allow-edit-btn"}
              onClick={() => {
                setCanEdit(true);
              }}
            >
              edit note
            </button>
            <button
              className={canEdit ? "save-changes-btn" : "save-changes-btn hide"}
              type="submit"
              onClick={(event) => {
                setCanEdit(false);
                props.onSubmitEdits(event, props.id);
              }}
            >
              confirm
            </button>
            <button
              className={
                canEdit ? "cancel-changes-btn" : "cancel-changes-btn hide"
              }
              type="button"
              onClick={() => {
                setCanEdit(false);
                props.onCancelEdits(props.origTitle, props.origDescription);
              }}
            >
              cancel
            </button>
          </span>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteModal;
