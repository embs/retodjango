import React, { Component } from 'react';

import './NewTask.css'

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: null,
      placeholder: 'Do Something',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const error = value === '' ? this.state.error : '';

    this.setState({
      name: event.target.value,
      error: error,
    });
  }

  handleKeyPress(event) {
    if(event.key === 'Enter' && this.state.name === '') {
      this.setState({
        error: 'new-task__input--error',
        placeholder: 'Please write something here'
      });
    }
  }

  render() {
    return (
      <div className="new-task">
        <input
          type="text"
          value={this.state.name}
          placeholder={this.state.placeholder}
          className={`new-task__input ${this.state.error}`}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default NewTask;
