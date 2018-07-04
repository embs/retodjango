import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import App from './App';
import List from './List';
import NewTask from './NewTask';
import Chalk from './Chalk';

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
  let handleNewTaskMock = jest.fn();
  const app = shallow(<App />);
  const newTask = app.find('NewTask');

  expect(newTask.length).toBe(1);

  app.instance().handleNewTask = handleNewTaskMock;
  const onSubmitProp = app.find('NewTask').props().onSubmit;
  onSubmitProp('Task Name');

  expect(handleNewTaskMock).toHaveBeenCalled();
});

it('creates new task', () => {
  let postFn = jest.fn();
  const taskNameFromUser = 'Go to the gym';
  const taskNameFromServer = `${taskNameFromUser} tomorrow`;
  const taskFromServer = { name: taskNameFromServer };
  const app = shallow(<App />);
  mockAxios.mockResponse({ data: [] });

  app.instance().handleNewTask(taskNameFromUser);

  expect(mockAxios.post).toHaveBeenCalledWith('/tasks',
    { name: taskNameFromUser });

  mockAxios.mockResponse({ data: taskFromServer });

  expect(app).toHaveState('tasks', [taskFromServer]);
});
