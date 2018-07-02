import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

it('renders empty ul', () => {
  const list = shallow(<List />);

  expect(list).toContainReact(<ul></ul>);
});

it('renders tasks', () => {
  const taskName = 'Do something';
  const task = { name: taskName };
  const list = shallow(<List tasks={[task]} />);

  expect(list).toContainReact(<li>Do something</li>);
});
