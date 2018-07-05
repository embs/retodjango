import React from 'react';
import { shallow } from 'enzyme';

import Task from './Task';

let task;
let props = { id: '123', name: 'Do something', done: false };
let onMarkAsDone = jest.fn();

beforeEach(() => {
  task = shallow(
    <Task
      id={props.id}
      name={props.name}
      done={props.done}
      onMarkAsDone={onMarkAsDone}
    />
  );
});

describe('render', () => {
  it('renders name', () => {
    expect(task.find('input')).toHaveProp('value', props.name);
  });

  it('renders mark as done button', () => {
    expect(task.find('button')).toHaveClassName('btn-outline-secondary');
  });
  
  describe('when task is done', () => {
    beforeAll(() => {
      props.done = true;
    });

    it('renders mark as done button', () => {
      expect(task.find('button')).toHaveClassName('btn-success');
    });

    it('renders task name with strikethrough', () => {
      expect(task.find('input')).toHaveClassName('task__name--done');
    });
  });
});

describe('onMarkAsDone', () => {
  it('calls function from props', () => {
    task.find('button').simulate('click');

    expect(onMarkAsDone).toHaveBeenCalledWith(props.id);
  });
});
