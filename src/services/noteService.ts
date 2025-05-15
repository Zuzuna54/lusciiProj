import { v4 as uuidv4 } from 'uuid';
import { Note, INote, ICreateNote } from '../models/note';
import { ValidationError, NotFoundError } from '../utils/errors';
import logger from '../utils/logger';

/**
 * Service class for managing notes
 */
class NoteService {
    private notes: INote[] = [];

    /**
     * Creates a new note with the given content
     * @param data - Object containing note content
     * @returns The created note
     * @throws ValidationError if content is invalid
     */
    createNote(data: ICreateNote): INote {
        // Safe logging - only try to substring if content is a string
        const contentPreview = typeof data.content === 'string'
            ? data.content.substring(0, 20) + '...'
            : String(data.content);

        logger.info('Creating note', { content: contentPreview });

        if (!Note.isValidContent(data.content)) {
            throw new ValidationError('Invalid note content', [
                'Content is required and must be a non-empty string',
                'Content must be less than 1000 characters'
            ]);
        }

        const id = uuidv4();
        const note = new Note(id, data.content);
        this.notes.push(note);

        logger.info('Note created successfully', { id });
        return { ...note };
    }

    /**
     * Gets all notes
     * @returns Array of all notes
     */
    getAllNotes(): INote[] {
        logger.info('Getting all notes', { count: this.notes.length });
        return [...this.notes];
    }

    /**
     * Gets a note by ID
     * @param id - ID of the note to retrieve
     * @returns The requested note or undefined if not found
     * @throws ValidationError if ID is invalid
     */
    getNote(id: string): INote | undefined {
        logger.info('Getting note by ID', { id });

        if (!Note.isValidId(id)) {
            throw new ValidationError('Invalid note ID', ['ID must be a valid UUID']);
        }

        return this.notes.find(note => note.id === id);
    }

    /**
     * Deletes a note by ID
     * @param id - ID of the note to delete
     * @returns Boolean indicating if a note was deleted
     * @throws ValidationError if ID is invalid
     * @throws NotFoundError if note doesn't exist
     */
    deleteNote(id: string): boolean {
        logger.info('Deleting note', { id });

        if (!Note.isValidId(id)) {
            throw new ValidationError('Invalid note ID', ['ID must be a valid UUID']);
        }

        // First check if the note exists
        const noteExists = this.notes.some(note => note.id === id);
        if (!noteExists) {
            throw new NotFoundError(`Note with ID ${id} not found`);
        }

        const initialLength = this.notes.length;
        this.notes = this.notes.filter(note => note.id !== id);

        const deleted = this.notes.length < initialLength;
        logger.info('Note deletion result', { deleted });

        return deleted;
    }

    /**
     * Clears all notes (for testing purposes)
     */
    clearNotes(): void {
        logger.info('Clearing all notes', { count: this.notes.length });
        this.notes = [];
    }
}

// Export a singleton instance
export default new NoteService(); 