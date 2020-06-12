import React, { Component } from 'react';
class TodoList extends Component {
    state = {
        todos: []
    };


    componentDidMount() {
        this.loadState()
            .then(res => {
                console.log(res);
                this.setState({ todos: res });
                console.log(this.state);
            })
            .catch(err => console.log(err));
    }

    loadState = async () => {
        const response = await fetch('http://localhost:5000/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };


    render() {
        return (
            <div className="TodoList">
                <table>
                    <thead>
                        <tr>{["title", "text", "done"].map((h, i) => <th key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.todos).map((k, i) => {
                            let data = this.state.todos[k];
                            return (
                                <tr key={i}>
                                    <td>{k}</td>
                                    <td>{data.title}</td>
                                    <td>{data.text}</td>
                                    <td>{new String(data.done)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default TodoList;