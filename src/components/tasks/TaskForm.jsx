import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TaskForm = ({currentTask, onTaskUpdated}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState("Pendiente");

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.titulo)
            setDescription(currentTask.descripcion)
            setStatus(currentTask.estado)
        }
    }, [currentTask]);

    const handleSubmit = async() => {
        if (currentTask) {
            await axios.put(`${API_URL}/tasks/${currentTask._id}`, {titulo: title, descripcion: description, estado: status})
        } else {
            await axios.post(`${API_URL}/tasks`, {titulo: title, descripcion: description});
        }
        onTaskUpdated();
        setTitle('');
        setDescription('');
        setStatus("Pendiente");
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
            {(currentTask && 
                <div>
                    <label>
                        <input
                            type="radio"
                            value="Pendiente"
                            checked={status=="Pendiente"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Pendiente
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Completado"
                            checked={status=="Completado"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        Completada
                    </label>
                </div>
            )}
            <button type="submit">{currentTask ? 'Actualizar' : 'Agregar'} Tarea</button>
        </form>
    );
}

export default TaskForm;