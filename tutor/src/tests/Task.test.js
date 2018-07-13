import React from 'react';
import { shallow } from 'enzyme';

import Task from './../components/Task';

let task;
let props = { id: '123', name: 'Do something', done: false };
let onMarkAsDone = jest.fn();
let onRemove = jest.fn();

beforeEach(() => {
  task = shallow(
    <Task
      id={props.id}
      name={props.name}
      done={props.done}
      onMarkAsDone={onMarkAsDone}
      onRemove={onRemove}
    />
  );
});

describe('render', () => {
  it('renders name', () => {
    expect(task.find('input')).toHaveProp('value', props.name);
  });

  it('renders mark as done button', () => {
    expect(task.find('button').first()).toHaveClassName('btn-outline-secondary');
  });

  it('renders remove button', () => {
    expect(task.find('button').last()).toHaveText('⌫');
  });
  
  describe('when task is done', () => {
    beforeAll(() => {
      props.done = true;
    });

    it('renders mark as done button', () => {
      expect(task.find('button').first()).toHaveClassName('btn-success');
    });

    it('renders task name with strikethrough', () => {
      expect(task.find('input')).toHaveClassName('task__name--done');
    });
  });
});

describe('onMarkAsDone', () => {
  it('calls function from props', () => {
    task.find('button').first().simulate('click');

    expect(onMarkAsDone).toHaveBeenCalledWith(props.id);
  });
});

describe('onRemove', () => {
  it('calls function from props', () => {
    task.find('button').last().simulate('click');

    expect(onRemove).toHaveBeenCalledWith(props.id);
  });
});
