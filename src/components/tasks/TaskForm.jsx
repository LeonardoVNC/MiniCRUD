import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TaskForm = ({currentTask, onTaskUpdated}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.titulo)
            setDescription(currentTask.descripcion)
        }
    }, [currentTask]);

    const handleSubmit = async() => {
        if (currentTask) {
            await axios.put(`${API_URL}/tasks/${currentTask._id}`, {titulo: title, descripcion: description})
        } else {
            await axios.post(`${API_URL}/tasks`, {titulo: title, descripcion: description});
        }
        onTaskUpdated();
        setTitle('');
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Título'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder='Descripción'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">{currentTask ? 'Actualizar' : 'Agregar'} Tarea</button>
        </form>
    );
}

export default TaskForm;