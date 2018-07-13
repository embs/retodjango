import React, { Component } from 'react';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import List from './List.js';
import NewTask from './NewTask.js';

import logo from './../img/logo.svg';

import './../css/App.css';

import Chalk from './../transport/Chalk.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    }
  }

  componentDidMount() {
    Chalk
      .get('/tasks')
      .then(response => {
        this.setState({
          tasks: response.data,
        });
      });
  }

  handleNewTask(taskName) {
    Chalk
      .post('/tasks', { name: taskName })
      .then(response => {
        this.setState({
          tasks: this.state.tasks.concat(response.data),
        });
      });
  }

  handleMarkAsDone(taskId) {
    let tasks = this.state.tasks.slice();
    const taskIndex = tasks.findIndex((t) => { return t.id === taskId });
    let task = tasks[taskIndex];

    Chalk
      .put(`/tasks/${task.id}`, Object.assign({}, task, { done: !task.done }))
      .then(response => {
        tasks[taskIndex] = response.data;
        this.setState({ tasks: tasks });
      })
      .catch(error => {
        console.log("ERROR " + error);
      });
  }

  handleRemove(taskId) {
    Chalk
      .delete(`/tasks/${taskId}`)
      .then(response => {
        let tasks = this.state.tasks.slice();
        tasks = tasks.filter((t) => { return t.id !== taskId });
        this.setState({ tasks: tasks });
      });
  }

  render() {
    return (
      <div className="App container-fluid">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List</h1>
        </header>
        <div className="row justify-content-center">
          <div className="col-3">
            <NewTask onSubmit={(t) => this.handleNewTask(t)} />
            <List
              tasks={this.state.tasks}
              onMarkAsDone={(t) => {this.handleMarkAsDone(t)}}
              onRemove={(t) => {this.handleRemove(t)}}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
