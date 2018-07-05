import React, { Component } from 'react';

import './Task.css';

class Task extends Component {
  doneButtonClass(done) {
    if(done) {
      return 'btn-success';
    } else {
      return 'btn-outline-secondary';
    }
  }

  inputClasses(done) {
    let modifier = '';

    if(done) {
      modifier = '--done';
    }

    return `form-control form-control-lg task__name${modifier}`;
  }

  render() {
    return (
      <li className="list-group-item list__item">
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className={`btn ${this.doneButtonClass(this.props.done)}`}
              type="button"
              onClick={() => this.props.onMarkAsDone(this.props.id)}
            >
              Done!
            </button>
          </div>
          <input
            className={this.inputClasses(this.props.done)}
            value={this.props.name}
          />
        </div>
      </li>
    );
  }
}

export default Task;
