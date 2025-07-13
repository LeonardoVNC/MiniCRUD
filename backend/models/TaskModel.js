const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, default:''},
    estado: {type: String, enum:['Pendiente', 'Completado'], default: 'Pendiente'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', TaskSchema);