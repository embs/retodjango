import React, { Component } from 'react';

class List extends Component {
  render() {
    const tasks = this.props.tasks;

    if(!tasks) {
      return <ul></ul>;
    }

    return (
      <ul className="list-group">
        {this.props.tasks.map((task, index) => {
          return (
            <li key={index} className="list-group-item">
              {task.name}
            </li>
          )
        })}
      </ul>
    );
  }
}

export default List;
