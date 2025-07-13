const express = require('express');
const router = express.Router();
const Task = require('../models/TaskModel');

//Get - Todas las tareas
router.get('/', async(req,res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Post - Crear una nueva tarea
router.post('/', async(req,res) => {
    const task = new Task ({
        titulo: req.body.titulo, 
        descripcion: req.body.descripcion
    })

    try {
        const newTask = await task.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Put - Actualizar una de las tareas
router.put('/:id', async(req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(400).json({message: 'Tarea no encontrada.'})
        
        task.titulo = req.body.titulo || task.titulo;
        task.descripcion = req.body.descripcion || task.descripcion;
        task.estado = req.body.estado || task.estado;

        const newTask = await task.save();
        res.json(newTask);
    } catch {
        res.status(500).json({message: error.message});
    }
});

//Delete - Borrar una tarea
router.delete('/:id', async(req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(400).json({message: 'Tarea no encontrada.'});
        
        res.json({message: 'Tarea eliminada.'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;