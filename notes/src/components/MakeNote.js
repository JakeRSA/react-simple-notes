import React from 'react';
import Note from './Note';

class NewNote extends React.Component {

    constructor(props) {
        super(props);
        this.notes = [];
        this.state = {
            description: '',
            dateTime: ''
        };
    }

    addNote(description) {
        this.setState({description: description, dateTime: new Date()});
        const note = {
            description: this.state.description,
            datetime: this.state.datetime
        };
        this.notes.push(note);
    }

    render() {
        const noteElems = this.notes.map(note => 
            <Note key={this.state.dateTime} description={this.state.description} />
        )
        return (
            <div>
                <textarea></textarea>
                <button onClick={() => {this.addNote('hey')}}>
                    add
                </button>
                <div>{noteElems}</div>
            </div>
        )
    }
}

export default NewNote;