import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TaskList = ({onDelete, onEdit}) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Tareas:</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <h3>{task.titulo}</h3>
                        <p>{task.descripcion}</p>
                        <p>Estado actual: {task.estado}</p>
                        <button onClick={() => onEdit(task)} >Editar</button>
                        <button onClick={() => {onDelete(task._id); fetchTasks();}} >Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList;