import express, { Router } from 'express';
import notesController from '../controllers/notesController';

const router: Router = express.Router();

// POST /notes — Add a new note
router.post('/', notesController.createNote.bind(notesController));

// GET /notes — Retrieve all notes
router.get('/', notesController.getNotes.bind(notesController));

// DELETE /notes/:id — Delete a note by ID
router.delete('/:id', notesController.deleteNote.bind(notesController));

export default router; 