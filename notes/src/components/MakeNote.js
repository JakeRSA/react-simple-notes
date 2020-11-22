import React from 'react'

class NewNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            datetime: ''
        };
    }

    onClick(description) {
        this.setState({description: description})
    }

    render() {
        return (
            <div>
                <textarea></textarea>
                <button>add</button>
            </div>
        )
    }
}

export default NewNote;