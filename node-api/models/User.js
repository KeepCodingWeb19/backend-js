import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String
    }
});

export const User = mongoose.model('User', userSchema);