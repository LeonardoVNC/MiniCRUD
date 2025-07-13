import './styles.css';
import { useState } from 'react';
import axios from 'axios';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [currentTask, setCurrentTask] = useState(null);

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    refreshList();
    setCurrentTask(null);
  }

  const handleEdit = (task) => {
    setCurrentTask(task);
  }

  const handleTaskUpdated = (task) => {
    setCurrentTask(null);
    refreshList();
  }

  const refreshList = () => {

  }

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm currentTask={currentTask} onTaskUpdated={handleTaskUpdated} />
      <TaskList onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};
export default App;
