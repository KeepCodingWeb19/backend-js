import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false, // Por defecto este campo nunca vendrá en las consultas
    }
});

// Método del modelo
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
};

export const User = mongoose.model('User', userSchema);