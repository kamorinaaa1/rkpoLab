import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string;
  text: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const TaskItem: React.FC<{ task: Task; moveTask: (id: string, toColumn: string) => void; removeTask: (id: string) => void }> = ({ task, moveTask, removeTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(moveTask)

  return (
    <div ref={drag} className="todo__task" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span className="todo__task-text">{task.text}</span>
      <button className="todo__task-delete" onClick={() => removeTask(task.id)}>x</button>
    </div>
  );
};

const Column: React.FC<{ column: Column; moveTask: (taskId: string, toColumn: string) => void; addTask: (columnId: string, text: string) => void; removeTask: (id: string) => void }> = ({ column, moveTask, addTask, removeTask }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => moveTask(item.id, column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const [newTaskText, setNewTaskText] = useState('');

  return (
    <div ref={drop} className={`column ${canDrop ? (isOver ? 'hovered' : 'can-drop') : ''}`}>
      <h3>{column.title}</h3>
      {column.tasks.map((task) => (
        <TaskItem key={task.id} task={task} moveTask={moveTask} removeTask={removeTask} />
      ))}
      <div className="create-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Новая задача"
        />
        <button onClick={() => { addTask(column.id, newTaskText); setNewTaskText(''); }}>Добавить</button>
      </div>
    </div>
  );
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'ToDo', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
    { id: 'blocked', title: 'Blocked', tasks: [] },
  ]);

  const moveTask = (taskId: string, toColumn: string) => {
    setColumns((prevColumns) => {
      const columnCopy = [...prevColumns];
      let taskToMove: Task | undefined;
      columnCopy.forEach((col) => {
        const taskIndex = col.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex > -1) {
          [taskToMove] = col.tasks.splice(taskIndex, 1);
        }
      });
      if (taskToMove) {
        const destinationColumn = columnCopy.find((col) => col.id === toColumn);
        destinationColumn?.tasks.push(taskToMove);
      }
      return columnCopy;
    });
  };

  const addTask = (columnId: string, text: string) => {
    if (text.trim()) {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, { id: uuidv4(), text }] }
            : col
        )
      );
    }
  };

  const removeTask = (id: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== id),
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="todo__list">
          <div className="columns-container">
            {columns.map((column) => (
              <Column key={column.id} column={column} moveTask={moveTask} addTask={addTask} removeTask={removeTask} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
