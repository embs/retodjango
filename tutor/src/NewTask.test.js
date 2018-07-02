import React from 'react';
import { shallow } from 'enzyme';
import NewTask from './NewTask';

it('shows error for blank task submission', () => {
  const newTask = buildNewTask();

  findInput(newTask).simulate('keyPress', { key: 'Enter' });

  expect(findInput(newTask)).toHaveClassName('new-task__input--error');
});

it('clears error after name assignment', () => {
  const newTask = buildNewTask();
  newTask.instance().setState({ error: 'new-task__input--error' });
  newTask.update();

  findInput(newTask).simulate('change', { target: { value: 'Take a ride' } });

  expect(findInput(newTask)).not.toHaveClassName('new-task__input--error');
});

function buildNewTask() {
  return shallow(<NewTask onKeyPress={() => {}} />);
}

function findInput(wrapper) {
  return wrapper.find('input');
}
