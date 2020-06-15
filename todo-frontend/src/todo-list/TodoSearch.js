import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';


class TodoSearch extends Component {

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
    }


    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit() {
        this.props.setFilter(this.state.title, this.state.text);
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
                                <Form.Control type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Title like" />
                            </div>
                            <div className='col-5'>
                                <Form.Control type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="Text like" />
                            </div>
                            <div className='col-2'>
                                <Button variant="secondary" onClick={this.handleSubmit}>Filter</Button>
                            </div>
                        </div>

                    </Form.Group>
                </Form>
            </Container >

        );
    }
}
export default TodoSearch;