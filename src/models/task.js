const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true }, //required: no puede guardar datos en blanco
    description: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);    