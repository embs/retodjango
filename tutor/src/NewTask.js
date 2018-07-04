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
    if(event.key !== 'Enter') {
      return;
    }

    if(this.state.name === '') {
      this.setState({
        error: 'is-invalid',
        placeholder: 'Please write something here'
      });
    } else {
      this.props.onSubmit(this.state.name);
      this.setState({ name: '' });
    }
  }

  render() {
    const inputClasses = 'form-control form-control-lg';

    return (
      <div className="new-task form-group">
        <div className="input-group mb-3">
          <input
            type="text"
            value={this.state.name}
            placeholder={this.state.placeholder}
            className={`new-task__input ${this.state.error} ${inputClasses}`}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <div className="input-group-append">
            <span className="input-group-text">⏎</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NewTask;
