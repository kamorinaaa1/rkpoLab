import React, {FC} from "react";
import Todo from "./Todo.tsx";
import {IToDo} from "../../App.tsx";

const TodoList: FC<Props> = ({filter, toDos, setToDo}) => {
  const del = () => {
    setToDo([]);
  };

  const toggleComplete = (id: number) => {
    setToDo(prevToDos =>
        prevToDos.map(todo =>
            todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo
        )
    );
  };

  const deleteTask = (id: number) => {
    setToDo(prevToDos => prevToDos.filter(todo => todo.id !== id));
  };

  const filteredTask = (filterNumber: number) => {
    if (filterNumber === 0) {
      return toDos;
    } else if (filterNumber === 1) {
      return toDos.filter(el => el.isComplete);
    } else {
      return toDos.filter(el => !el.isComplete);
    }
  };

  return (
      <div className="todo__list">
        {filteredTask(filter).map(el => (
            <Todo
                key={el.id}
                id={el.id}
                name={el.name}
                isComplete={el.isComplete}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
            />
        ))}
        <div className="todo__list-clear" onClick={del}>
          Clear
        </div>
      </div>
  );
};

export default TodoList;

interface Props {
  filter: number;
  toDos: IToDo[];
  setToDo: React.Dispatch<React.SetStateAction<IToDo[]>>;
}
