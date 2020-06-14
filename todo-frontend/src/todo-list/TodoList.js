import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TodoAdd from './TodoAdd'

class TodoList extends Component {
    state = {
        todos: [],
        addNewVisible: Boolean,
    };


    constructor(props) {
        super(props);

        this.toogleAdd = this.toogleAdd.bind(this);
        this.loadAPIData = this.loadAPIData.bind(this);
    }

    toogleAdd() {
        let newVisible = !this.state.addNewVisible;
        this.setState({ addNewVisible: newVisible });

    }

    componentDidMount() {
        this.setState({ addNewVisible: false });
        this.loadAPIData();

    }


    async loadAPIData() {
        console.log("loading data");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ todos: body });
    };



    render() {
        const renderAddNewText = () => {
            if (!this.state.addNewVisible) {
                return <div>Add New Task</div>
            } else {
                return <div>Hide</div>
            }
        }

        return (
            <Container className="p-3">
                <div className="TodoList">
                    <Table>
                        <thead>
                            <tr>{["ID", "Title", "Text", "Done"].map((h, i) => <th key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.todos).map((k, i) => {
                                let data = this.state.todos[k];
                                return (
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>{data.text}</td>
                                        <td>{new String(data.done)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <TodoAdd afterAdd={this.loadAPIData} isVisible={this.state.addNewVisible}></TodoAdd>

                <Container className='mt-3'>
                    <Button variant="link" onClick={this.toogleAdd}>
                        {renderAddNewText()}
                    </Button>
                </Container>

            </Container>

        );
    }


}
export default TodoList;