import express, { Router } from 'express';
import notesController from '../controllers/notesController';
import { validateCreateNote, validateNoteId } from '../middleware/validators';
import { defaultLimiter, strictLimiter } from '../middleware/rateLimiter';

const router: Router = express.Router();

// POST /notes — Add a new note
router.post(
    '/',
    strictLimiter,
    validateCreateNote,
    notesController.createNote.bind(notesController)
);

// GET /notes — Retrieve all notes
router.get(
    '/',
    defaultLimiter,
    notesController.getNotes.bind(notesController)
);

// DELETE /notes/:id — Delete a note by ID
router.delete(
    '/:id',
    strictLimiter,
    validateNoteId,
    notesController.deleteNote.bind(notesController)
);

export default router; 