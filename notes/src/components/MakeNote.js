import React from 'react';
import Note from './Note';

class NewNote extends React.Component {

    constructor(props) {
        super(props);
        this.notes = [];
        this.state = {
            description: '',
            dateTime: '',
            count: 1
        };
    }

    onDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})
    }
    
    addNote(description) {
        this.setState({description: description, dateTime: new Date()});
        const note = {
            dateTime: this.state.dateTime,
            description: description,
            count: this.state.count
        };
        this.notes.push(note);
        this.setState({count: this.state.count + 1});
    }

    render() {
        const noteElems = this.notes.map(note => 
            <Note key={note.count} dateTime={this.state.dateTime} description={note.description}/>
        )
        return (
            <div>
                <textarea onChange={event => this.onDescriptionChange(event)}></textarea>
                <button onClick={() => {this.addNote(this.state.description)}}>
                    add
                </button>
                <div>{noteElems}</div>
            </div>
        )
    }
}

export default NewNote;