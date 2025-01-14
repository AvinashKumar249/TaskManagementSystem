const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    //Task_id: { type: Number, default: 
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigned_to: { type: String, required: true },
    status: { type: String, default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);

