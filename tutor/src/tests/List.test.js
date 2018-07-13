import React from 'react';
import { shallow } from 'enzyme';

import List from './../components/List';
import Task from './../components/Task';

describe('render', () => {
  it('renders tasks', () => {
    let onMarkAsDone = jest.fn();
    let onRemove = jest.fn();
    const task = { id: '123', name: 'Do something', done: false };
    const list = shallow(
      <List tasks={[task]} onMarkAsDone={onMarkAsDone} onRemove={onRemove} />);
    const renderedTaskProps = list.find(Task).props();
  
    expect(renderedTaskProps.id).toEqual(task.id);
    expect(renderedTaskProps.name).toEqual(task.name);
    expect(renderedTaskProps.done).toEqual(task.done);
    expect(renderedTaskProps.done).toEqual(task.done);
    expect(renderedTaskProps.onMarkAsDone).toEqual(onMarkAsDone);
    expect(renderedTaskProps.onRemove).toEqual(onRemove);
  });

  describe('when there are not any tasks to render', () => {
    const list = shallow(<List />);
    
    it('renders empty ul', () => {
      expect(list).toContainReact(<ul></ul>);
    });
  });
});
