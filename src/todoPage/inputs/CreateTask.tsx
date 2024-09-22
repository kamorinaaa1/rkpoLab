import React, { FC, useState } from "react";
import {IToDo} from "../../App.tsx";

const CreateTask: FC<Props> = ({ toDos, setToDo }) => {
  const [taskName, setTaskName] = useState<string>("");

  const handleAddTask = () => {
    if (taskName.trim()) {
      const newTask: IToDo = {
        id: Date.now(),
        name: taskName,
        isComplete: false
      };

      setToDo([...toDos, newTask]);
      setTaskName("");
    }
  };

  return (
      <div className="create-task">
        <input
            maxLength={40}
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit" onClick={handleAddTask}>
          ADD
        </button>
      </div>
  );
};

interface Props {
  toDos: IToDo[];
  setToDo: React.Dispatch<React.SetStateAction<IToDo[]>>;
}

export default CreateTask;
