import React, {useState} from "react";
import axios from "axios";

import addSVG from "../../assets/img/add.svg";

const AddTaskForm = ({list, onAddTask}) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    if (inputValue) {
      const obj = {
        listId: 2,
        text: inputValue,
        completed: false
      };
      setIsLoading(true);
      axios
        .post("http://localhost:3001/tasks", obj)
        .then(({data}) => {
          console.log(data);
          onAddTask(list.id, data);
          toggleFormVisible();
        })
        .catch(() => alert("Ошибка при добавлении задачи"))
        .finally(() => setIsLoading(true));
    } else {
      alert("Введите название списка!");
    }
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSVG} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className="field"
            placeholder="Текст задачи"
            type="text"
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
