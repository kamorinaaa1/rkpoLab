import { FC } from "react";

const Todo: FC<Props> = ({ id, name, isComplete, toggleComplete, deleteTask }) => {
  return (
      <div className={`todo__task ${isComplete ? "todo__task--completed" : ""}`} key={id}>
        <input
            className="todo__task-checkbox"
            type="checkbox"
            checked={isComplete}
            onChange={() => toggleComplete(id)}
        />
        <span onClick={() => toggleComplete(id)} className="todo__task-text">{name}</span>
        <button className="todo__task-delete" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
  );
};

export default Todo;

interface Props {
  id: number;
  name: string;
  isComplete: boolean;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}
