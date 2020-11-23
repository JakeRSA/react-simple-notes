import '../stylesheets/Note.css'

function Note(props) {
    return(
        <div className='note'>
            <h1>{props.description}</h1>
        </div>
    )
}

export default Note;