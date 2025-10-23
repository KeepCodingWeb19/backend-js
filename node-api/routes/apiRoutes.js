import express from 'express';

// Controllers
import { healthCall } from '../controllers/healthController.js';
import { getDemo, getDownload, getEnd, getFile, getOneParamOptional, getRedirect, getTwoParams } from '../controllers/demoController.js';

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], healthCall);

// Demo & Params
router.get('/demo', getDemo);
router.get('/download', getDownload);
router.get('/file', getFile);
router.get('/redirect', getRedirect);
router.get('/end', getEnd);
// router.get('/params/:id', getOneParam);
router.get('/params/{:id}', getOneParamOptional);
router.get('/params/:company/:username', getTwoParams);

