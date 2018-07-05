import React from 'react';

import Task from './Task';

import './List.css';

function List(props) {
  const tasks = props.tasks;

  if(!tasks) {
    return <ul></ul>;
  }

  return (
    <ul className="list-group list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            done={task.done}
            onMarkAsDone={props.onMarkAsDone}
            onRemove={props.onRemove}
          />
        )
      })}
    </ul>
  );
}

export default List;
