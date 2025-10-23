import express from 'express';

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], (req, res, next) => {
    res.status(200).send('Server Online');
});
