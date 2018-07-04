import React, { Component } from 'react';

class List extends Component {
  render() {
    const tasks = this.props.tasks;

    if(!tasks) {
      return <ul></ul>;
    }

    return (
      <ul>
        {this.props.tasks.map((task, index) => {
          return <li key={index}>{task.name}</li>
        })}
      </ul>
    );
  }
}

export default List;
