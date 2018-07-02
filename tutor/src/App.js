import React, { Component } from 'react';
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
          tasks: response.data.tasks,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List</h1>
        </header>
        <NewTask />
        <List tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
