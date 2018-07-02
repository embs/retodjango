import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import List from './List';
import NewTask from './NewTask';

it('renders title', () => {
  const app = shallow(<App />);

  expect(app).toContainReact(<h1 className="App-title">Todo List</h1>);
});

it('renders tasks list', () => {
  const app = shallow(<App />);

  expect(app).toContainReact(<List />);
});

it('renders new task input', () => {
  const app = shallow(<App />);

  expect(app).toContainReact(<NewTask />);
});
