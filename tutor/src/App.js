import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import Chalk from './Chalk.js';
import List from './List.js';
import NewTask from './NewTask.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    }
  }

  componentDidMount() {
    Chalk('/tasks')
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
            <List tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
