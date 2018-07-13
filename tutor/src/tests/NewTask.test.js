import React from 'react';
import { shallow } from 'enzyme';

import NewTask from './../components/NewTask';

it('shows error for blank task submission', () => {
  const newTask = buildNewTask();

  findInput(newTask).simulate('keyPress', { key: 'Enter' });

  expect(findInput(newTask)).toHaveClassName('is-invalid');
});

it('clears error after name assignment', () => {
  const newTask = buildNewTask();
  newTask.instance().setState({ error: 'new-task__input--error' });
  newTask.update();

  findInput(newTask).simulate('change', { target: { value: 'Take a ride' } });

  expect(findInput(newTask)).not.toHaveClassName('new-task__input--error');
});

it('calls onSubmit prop on valid submission', () => {
  let callback = jest.fn();
  const newTask = buildNewTask(callback);

  newTask.instance().setState({ name: 'A Valid Name' });
  newTask.instance().handleKeyPress({ key: 'Enter' });

  expect(callback).toHaveBeenCalled();
});

it('does not call onSubmit when pressing a key other than Enter', () => {
  let callback = jest.fn();
  const newTask = buildNewTask(callback);

  newTask.instance().handleKeyPress({ key: 'a' });

  expect(callback).not.toHaveBeenCalled();
});

it('clears input value after submission', () => {
  const newTask = buildNewTask();

  newTask.instance().setState({ name: 'Something here' });
  newTask.instance().handleKeyPress({ key: 'Enter' });

  expect(newTask).toHaveState('name', '');
});

function buildNewTask(callback) {
  if(!callback) {
    callback = () => {}
  }
  return shallow(<NewTask onSubmit={callback} />);
}

function findInput(wrapper) {
  return wrapper.find('input');
}
