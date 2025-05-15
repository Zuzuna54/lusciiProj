import express, { Router, Request, Response } from 'express';

const notesRouter: Router = express.Router();

// POST /notes — Add a new note
notesRouter.post('/', (_req: Request, res: Response) => {
    // This will be implemented in Phase 2
    res.status(501).json({
        error: {
            status: 501,
            message: 'Not implemented yet'
        }
    });
});

// GET /notes — Retrieve all notes
notesRouter.get('/', (_req: Request, res: Response) => {
    // This will be implemented in Phase 2
    res.status(501).json({
        error: {
            status: 501,
            message: 'Not implemented yet'
        }
    });
});

// DELETE /notes/:id — Delete a note by ID
notesRouter.delete('/:id', (_req: Request, res: Response) => {
    // This will be implemented in Phase 2
    res.status(501).json({
        error: {
            status: 501,
            message: 'Not implemented yet'
        }
    });
});

export default notesRouter; 