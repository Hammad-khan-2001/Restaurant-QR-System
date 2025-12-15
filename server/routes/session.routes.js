import express from 'express';
import { session } from '../controllers/session.controller.js';
import verifySession from '../middlewares/verifySession.js';

const router = express.Router() ;

router.post('/session', verifySession, session)

export default router