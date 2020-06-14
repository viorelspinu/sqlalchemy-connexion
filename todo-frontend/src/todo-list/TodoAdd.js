import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';


class TodoAdd extends Component {

    state = {
        title: "",
        text: "",
    };

    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
        console.log(this.state);
    }


    handleTextChange(event) {
        this.setState({ text: event.target.value });
        console.log(this.state);
    }

    async handleSubmit() {
        console.log("SUBMIT");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.state.title, text: this.state.text }),
        });
        const body = await response.text();
        this.props.afterAdd();
        console.log(body);
    };


    render() {
        if (!this.props.isVisible) {
            return null;
        }
        return (
            <Container className="p-3">
                <Form>
                    <Form.Group controlId="title">
                        <div className='row'>
                            <div className='col-5'>
                                <Form.Control type="text" onChange={this.handleTitleChange} placeholder="Enter title" />
                            </div>
                            <div className='col-5'>
                                <Form.Control type="text" onChange={this.handleTextChange} placeholder="Enter text" />
                            </div>
                            <div className='col-2'>
                                <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                            </div>
                        </div>

                    </Form.Group>


                </Form>
            </Container >

        );
    }
}
export default TodoAdd;