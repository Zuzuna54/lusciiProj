import { Request, Response, NextFunction } from 'express';
import noteService from '../services/noteService';
import { NotFoundError } from '../utils/errors';

/**
 * Controller for handling notes-related requests
 */
class NotesController {
    /**
     * Creates a new note
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Express next function
     */
    createNote(req: Request, res: Response, next: NextFunction): void {
        try {
            // Validation is already handled by middleware
            const { content } = req.body;
            const newNote = noteService.createNote({ content });

            // Return created note
            res.status(201).json({
                data: newNote
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Gets all notes
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Express next function
     */
    getNotes(_req: Request, res: Response, next: NextFunction): void {
        try {
            const notes = noteService.getAllNotes();

            res.status(200).json({
                data: notes,
                meta: {
                    total: notes.length
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Deletes a note by ID
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Express next function
     */
    deleteNote(req: Request, res: Response, next: NextFunction): void {
        try {
            // Validation is already handled by middleware
            const { id } = req.params;

            // Check if note exists
            const note = noteService.getNote(id);
            if (!note) {
                throw new NotFoundError(`Note with ID ${id} not found`);
            }

            // Delete note
            noteService.deleteNote(id);

            // Return no content
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

// Export a singleton instance
export default new NotesController(); 