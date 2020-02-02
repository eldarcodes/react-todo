import React from "react";
import axios from "axios";

import editSVG from "../../assets/img/edit.svg";
import AddTaskForm from "./AddTaskForm";

import "./Tasks.scss";

const Tasks = ({list, onEditTitle, onAddTask}) => {
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

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name} <img onClick={editTitle} src={editSVG} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map(task => (
          <div key={task.id} className="tasks__items-row">
            <div className="checkbox">
              <input id={`task-${task.id}`} type="checkbox" />
              <label htmlFor={`task-${task.id}`}>
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
            </div>
            <input readOnly value={task.text} />
          </div>
        ))}
        <AddTaskForm onAddTask={onAddTask} list={list} />
      </div>
    </div>
  );
};

export default Tasks;
