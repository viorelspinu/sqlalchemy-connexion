import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TodoAdd from './TodoAdd'
import TodoSearch from './TodoSearch'

class TodoList extends Component {
    state = {
        todos: [],
        addNewVisible: Boolean,
        titleLike: String,
        textLike: String
    };


    constructor(props) {
        super(props);

        this.toogleAdd = this.toogleAdd.bind(this);
        this.loadAPIData = this.loadAPIData.bind(this);
        this.doFilter = this.doFilter.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.state.titleLike = "";
        this.state.textLike = "";
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

    async setFilter(title, text) {
        await this.setState({ titleLike: title, textLike: text });
        await this.doFilter();
    }

    async doFilter() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/task/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.state.titleLike, text: this.state.textLike }),
        });
        const body = await response.json();
        console.log(body);
        this.setState({ todos: body });
    };



    render() {
        const renderAddNewText = () => {
            if (!this.state.addNewVisible) {
                return <div>Add New Task</div>
            } else {
                return <div>Cancel</div>
            }
        }

        return (
            <Container className="p-3">

                <Container className='mt-3'>
                    <TodoSearch isVisible={!this.state.addNewVisible} className="" setFilter={this.setFilter}></TodoSearch>
                </Container>

                <Container className='mt-3'>
                    <TodoAdd afterAdd={this.doFilter} isVisible={this.state.addNewVisible}></TodoAdd>
                    <Button className="float-right mr-5" variant="link" onClick={this.toogleAdd}>
                        {renderAddNewText()}
                    </Button>
                </Container>

                <div className="TodoList mt-2">
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



            </Container>

        );
    }


}
export default TodoList;