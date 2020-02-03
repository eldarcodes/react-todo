import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import editSVG from "../../assets/img/edit.svg";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка ", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(`http://localhost:3001/lists/${list.id}`, {
          name: newTitle
        })
        .catch(() => alert("Не удалось обновить название списка!"));
    }
  };

  const onEdit = () => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{color: list.color.hex}} className="tasks__title">
          {list.name} <img onClick={editTitle} src={editSVG} alt="Edit icon" />
        </h2>
      </Link>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              key={task.id}
              {...task}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
            />
          ))}
        <AddTaskForm key={list.id} onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
};

export default Tasks;
