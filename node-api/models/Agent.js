import mongoose, { Schema } from 'mongoose';

const agentSchema = new Schema({
    name: { type: String, unique: true },
    age: { type: Number, min: 18, max: 130, index: true },
    owner: {
        type: Schema.Types.ObjectId, ref: 'User', index: true
    },
});

export const Agent = mongoose.model('Agent', agentSchema);

// TODO: crea un controlador, y una ruta para crear un nuevo agente via /api/agents