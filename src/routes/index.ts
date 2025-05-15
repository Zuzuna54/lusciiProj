import express, { Router } from 'express';
import notesRoutes from './notes.routes';

const router: Router = express.Router();

// API routes
router.use('/notes', notesRoutes);

export default router; 