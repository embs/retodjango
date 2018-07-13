import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';

import App from './../components/App';
import List from './../components/List';
import NewTask from './../components/NewTask';

import Chalk from './../transport/Chalk';

let app;
let tasksFromServer;

beforeEach(() => {
  app = new App();
});


afterEach(() => {
  mockAxios.reset();
});

describe('constructor', () => {
  it('initializes state with an empty tasks array', () => {
    expect(app.state.tasks).toBeDefined();
    expect(app.state.tasks.length).toBe(0);
  });
});

describe('componentDidMount', () => {
  let setState = jest.fn();

  beforeEach(() => {
    app.setState = setState;
    app.componentDidMount();
    mockAxios.mockResponse({ data: tasksFromServer });
  });

  it('fetches tasks from backend', () => {
    expect(mockAxios.get).toHaveBeenCalledWith('/tasks');
  });

  it('sets state with tasks fetched from the server', () => {
    expect(setState).toHaveBeenCalledWith({ tasks: tasksFromServer });
  });
});

describe('handleNewTask', () => {
  let taskNameFromUser = 'Go to the gym';
  let postFn = jest.fn();
  let setState = jest.fn();
  const taskNameFromServer = `${taskNameFromUser} tomorrow`;
  const taskFromServer = { name: taskNameFromServer };

  beforeEach(() => {
    app.setState = setState;
    app.handleNewTask(taskNameFromUser);
    mockAxios.mockResponse({ data: taskFromServer });
  });

  it('POSTs new task to the backend', () => {
    expect(mockAxios.post).toHaveBeenCalledWith('/tasks',
      { name: taskNameFromUser });
  });

  it("sets state with tasks fetched given as server's response", () => {
    expect(setState).toHaveBeenCalledWith({ tasks: [taskFromServer] });
  });
});

describe('handleMarkAsDone', () => {
  let task = { id: 51, name: 'Make homework', done: false };
  let setState = jest.fn();
  let taskFromServer = jest.fn();

  const putsTaskWithNegatedDone = () => {
    expect(mockAxios.put).toHaveBeenCalledWith(`/tasks/${task.id}`,
      Object.defineProperty(task, 'done', { value: !task.done }));
  }

  beforeEach(() => {
    app.state = { tasks: [task] };
    app.setState = setState;
    app.handleMarkAsDone(task.id);
    mockAxios.mockResponse({ data: taskFromServer });
  });

  it('PUTs task with done true', putsTaskWithNegatedDone);

  it("sets state according to server's response", () => {
    expect(setState).toHaveBeenCalledWith({
      tasks: [taskFromServer]
    });
  });
 
  describe('when task is done', () => {
    beforeAll(() => {
      task.done = true;
    });

    it('PUTs task with done false', putsTaskWithNegatedDone);
  });
});

describe('handleRemove', () => {
  let task = { id: 50, name: 'Make homework', done: false };
  let task1 = { id: 51, name: 'Make homework', done: false };
  let setState = jest.fn();

  beforeEach(() => {
    app.state = { tasks: [task, task1] };
    app.setState = setState;
    app.handleRemove(task.id);
    mockAxios.mockResponse({ data: {} });
  });

  it('DELETEs task from backend', () => {
    expect(mockAxios.delete).toHaveBeenCalledWith(`/tasks/${task.id}`);
  });

  it('updates state', () => {
    expect(setState).toHaveBeenCalledWith({ tasks: [task1] });
  });
});

describe('render', () => {
  beforeEach(() => {
    tasksFromServer = [{ name: 'Make homework' }];
    app = shallow(<App />);
    mockAxios.mockResponse({ data: tasksFromServer });
  });

  it('renders title', () => {
    expect(app).toContainReact(<h1 className="App-title">Todo List</h1>);
  });

  it('renders tasks list', () => {
    expect(app).toIncludeText('<List />');
    expect(app).toHaveState('tasks', tasksFromServer);
  });

  it('renders new task input', () => {
    let handleNewTaskMock = jest.fn();
    const newTask = app.find('NewTask');

    expect(newTask.length).toBe(1);

    app.instance().handleNewTask = handleNewTaskMock;
    const onSubmitProp = app.find('NewTask').props().onSubmit;
    onSubmitProp('Task Name');

    expect(handleNewTaskMock).toHaveBeenCalled();
  });

  it('assigns handler for marking task as done', () => {
    let handleMarkAsDone = jest.fn();
    const onMarkAsDone = app.find('List').props().onMarkAsDone;
    const taskId = 123;

    expect(onMarkAsDone).toBeDefined();

    app.instance().handleMarkAsDone = handleMarkAsDone;
    onMarkAsDone(taskId);

    expect(handleMarkAsDone).toHaveBeenCalledWith(taskId);
  });

  it('assigns handler for removing task', () => {
    let handleRemove = jest.fn();
    const onRemove = app.find('List').props().onRemove;
    const taskId = 123;

    expect(onRemove).toBeDefined();

    app.instance().handleRemove = handleRemove;
    onRemove(taskId);

    expect(handleRemove).toHaveBeenCalledWith(taskId);
  });
});
