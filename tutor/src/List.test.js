import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

it('renders empty ul', () => {
  const list = shallow(<List />);

  expect(list).toContainReact(<ul></ul>);
});

it('renders tasks', () => {
  const task = { id: '123', name: 'Do something' };
  const list = shallow(<List tasks={[task]} />);

  expect(list).toHaveText(task.name);
  expect(list.find('li').at(0).key()).toBe(task.id);
});
