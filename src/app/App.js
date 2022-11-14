import React from "react";
const { Component } = require("react");

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({ html: 'Task Updated' });
                this.setState({ title: '', description: '', _id: '' });
                this.fetchTask();
            });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task saved' });
                    this.setState({ title: '', description: '' });
                    this.fetchTask();   
                })
                .catch(err => console.error(err));
        }
        e.preventDefault(); 
    }

    componentDidMount(){
        this.fetchTask();
    }

    fetchTask(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task deleted' });
                    this.fetchTask();
                })
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`, {
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    render(){
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" onChange={this.handleChange} placeholder="Task title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{ task.title }</td>
                                                    <td>{ task.description }</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4">
                                                            <i className="material-icons" onClick={() => this.editTask(task._id)}>edit</i>
                                                        </button>
                                                        <button className="btn red darken-4" style={{margin: '4px'}}>
                                                            <i className="material-icons" onClick={() => this.deleteTask(task._id)}>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;