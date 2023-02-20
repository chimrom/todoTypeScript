import React, { useState, ChangeEvent } from "react";
import { Input, Button } from "antd";
import { Task } from "./Components/Task/Task";

interface Task {
  text: string;
  isChecked: boolean;
  id: number;
}

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[] | []>([]);

  const createTask = () => {
    if (inputValue) {
      setTasks((prevState) => [
        ...prevState,
        { text: inputValue.trim(), isChecked: false, id: Date.now() },
      ]);
      setInputValue("");
    }
  };

  const toggleCheck = (id: number) => {
    setTasks((prevState) =>
      prevState.map((el) =>
        el.id === id ? { ...el, isChecked: !el.isChecked } : el
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const editTask = (id: number, text: string) => {
    setTasks((prevState) =>
      prevState.map((el) => (el.id === id ? { ...el, text } : el))
    );
  };
  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <div style={{ display: "flex" }}>
        <Input
          placeholder="Напиши в меня"
          value={inputValue}
          onChange={changeValue}
        />
        <Button type="primary" onClick={createTask}>
          add
        </Button>
      </div>
      {tasks.map(({ text, isChecked, id }) => (
        <Task
          text={text}
          isChecked={isChecked}
          id={id}
          key={id}
          onCheck={toggleCheck}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </div>
  );
}

export default App;
