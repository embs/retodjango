import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import App from './App';
import List from './List';
import NewTask from './NewTask';

afterEach(() => {
  mockAxios.reset();
})

it('renders title', () => {
  const app = shallow(<App />);

  expect(app).toContainReact(<h1 className="App-title">Todo List</h1>);
});

it('renders tasks list', () => {
  const tasks = [{ name: 'Make homework' }];
  const app = shallow(<App />);
  mockAxios.mockResponse({ data: tasks });

  expect(app).toIncludeText('<List />');
  expect(app).toHaveState('tasks', tasks);
});

it('renders new task input', () => {
  const app = shallow(<App />);

  expect(app).toContainReact(<NewTask />);
});
