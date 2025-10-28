import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    }
});

export const User = mongoose.model('User', userSchema);