import { v4 as uuidv4 } from 'uuid';
import { Note, INote, ICreateNote } from '../models/note';

/**
 * Service class for managing notes
 */
class NoteService {
    private notes: INote[] = [];

    /**
     * Creates a new note with the given content
     * @param data - Object containing note content
     * @returns The created note
     * @throws Error if content is invalid
     */
    createNote(data: ICreateNote): INote {
        if (!Note.isValidContent(data.content)) {
            throw new Error('Invalid note content');
        }

        const id = uuidv4();
        const note = new Note(id, data.content);
        this.notes.push(note);

        return { ...note };
    }

    /**
     * Gets all notes
     * @returns Array of all notes
     */
    getAllNotes(): INote[] {
        return [...this.notes];
    }

    /**
     * Gets a note by ID
     * @param id - ID of the note to retrieve
     * @returns The requested note or undefined if not found
     * @throws Error if ID is invalid
     */
    getNote(id: string): INote | undefined {
        if (!Note.isValidId(id)) {
            throw new Error('Invalid note ID');
        }

        return this.notes.find(note => note.id === id);
    }

    /**
     * Deletes a note by ID
     * @param id - ID of the note to delete
     * @returns Boolean indicating if a note was deleted
     * @throws Error if ID is invalid
     */
    deleteNote(id: string): boolean {
        if (!Note.isValidId(id)) {
            throw new Error('Invalid note ID');
        }

        const initialLength = this.notes.length;
        this.notes = this.notes.filter(note => note.id !== id);

        return this.notes.length < initialLength;
    }

    /**
     * Clears all notes (for testing purposes)
     */
    clearNotes(): void {
        this.notes = [];
    }
}

// Export a singleton instance
export default new NoteService(); 