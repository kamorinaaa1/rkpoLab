import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoPage from "./todoPage/TodoPage.tsx";
import KanbanBoard from "./dndPage/DndPage.tsx";

function App() {
  return (
      <Router>
        <nav>
          <Link to="/">To-Do List</Link>
          <Link to="/dnd">DnD Board</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dnd" element={<KanbanBoard />} />
        </Routes>
      </Router>
  );
}

export default App;


export interface IToDo {
  id: number;
  name: string;
  isComplete: boolean;
}

export enum FilterState {
  all = 0,
  done,
  undone,
}
