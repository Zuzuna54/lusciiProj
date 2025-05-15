import { Request, Response } from 'express';
import noteService from '../services/noteService';
import { Note } from '../models/note';

/**
 * Controller for handling notes-related requests
 */
class NotesController {
    /**
     * Creates a new note
     * @param req - Express request object
     * @param res - Express response object
     */
    createNote(req: Request, res: Response): void {
        try {
            const { content } = req.body;

            // Validate content
            if (!Note.isValidContent(content)) {
                res.status(400).json({
                    error: {
                        status: 400,
                        message: 'Invalid note content',
                        details: ['Content is required and must be a non-empty string']
                    }
                });
                return;
            }

            // Create note
            const newNote = noteService.createNote({ content });

            // Return created note
            res.status(201).json({
                data: newNote
            });
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({
                error: {
                    status: 500,
                    message: 'Failed to create note'
                }
            });
        }
    }

    /**
     * Gets all notes
     * @param req - Express request object
     * @param res - Express response object
     */
    getNotes(_req: Request, res: Response): void {
        try {
            const notes = noteService.getAllNotes();

            res.status(200).json({
                data: notes,
                meta: {
                    total: notes.length
                }
            });
        } catch (error) {
            console.error('Error retrieving notes:', error);
            res.status(500).json({
                error: {
                    status: 500,
                    message: 'Failed to retrieve notes'
                }
            });
        }
    }

    /**
     * Deletes a note by ID
     * @param req - Express request object
     * @param res - Express response object
     */
    deleteNote(req: Request, res: Response): void {
        try {
            const { id } = req.params;

            // Validate ID
            if (!Note.isValidId(id)) {
                res.status(400).json({
                    error: {
                        status: 400,
                        message: 'Invalid note ID',
                        details: ['ID must be a valid UUID']
                    }
                });
                return;
            }

            // Check if note exists
            const note = noteService.getNote(id);
            if (!note) {
                res.status(404).json({
                    error: {
                        status: 404,
                        message: `Note with ID ${id} not found`
                    }
                });
                return;
            }

            // Delete note
            noteService.deleteNote(id);

            // Return no content
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({
                error: {
                    status: 500,
                    message: 'Failed to delete note'
                }
            });
        }
    }
}

// Export a singleton instance
export default new NotesController(); 