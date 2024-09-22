import { useState } from 'react';
import PickFilter from "./inputs/PickFilter.tsx";
import CreateTask from "./inputs/CreateTask.tsx";
import TodoList from "./tasks/TodoList.tsx";
import {FilterState, IToDo} from "../App.tsx";

function TodoPage() {
  const [toDos, setTodo] = useState<IToDo[]>([]);
  const [filter, setFilter] = useState<FilterState>(FilterState.all);

  return (
      <div className="container">
        <PickFilter filter={filter} setFilter={setFilter} />
        <CreateTask toDos={toDos} setToDo={setTodo} />
        <TodoList filter={filter} toDos={toDos} setToDo={setTodo} />
      </div>
  );
}

export default TodoPage;
