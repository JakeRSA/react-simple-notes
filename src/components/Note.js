import "../stylesheets/Note.css";

function Note(props) {
  console.log(props)
  return (
    <div className="note">
      <p>{props.dateTime}</p>
      <h1>{props.description}</h1>
    </div>
  );
}

export default Note;
