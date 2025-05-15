import noteService from '../../../src/services/noteService';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError, NotFoundError } from '../../../src/utils/errors';

// Mock uuid module
jest.mock('uuid', () => ({
    v4: jest.fn()
}));

describe('NoteService', () => {
    beforeEach(() => {
        // Clear all notes before each test
        noteService.clearNotes();
        jest.clearAllMocks();
    });

    describe('createNote', () => {
        it('should create a new note with valid content', () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            (uuidv4 as jest.Mock).mockReturnValue(mockId);

            const content = 'Test note';
            const note = noteService.createNote({ content });

            expect(note).toEqual({
                id: mockId,
                content,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
        });

        it('should throw an error when content is invalid', () => {
            // Empty content
            expect(() => noteService.createNote({ content: '' }))
                .toThrow(ValidationError);

            // Content is too long (assuming there's a max length validation)
            const longContent = 'a'.repeat(1001); // Assuming max length is 1000
            expect(() => noteService.createNote({ content: longContent }))
                .toThrow(ValidationError);

            // Content is not a string
            expect(() => noteService.createNote({ content: 123 as any }))
                .toThrow(ValidationError);
        });
    });

    describe('getAllNotes', () => {
        it('should return an empty array when no notes exist', () => {
            const notes = noteService.getAllNotes();
            expect(notes).toEqual([]);
        });

        it('should return all created notes', () => {
            const mockId1 = '123e4567-e89b-12d3-a456-426614174000';
            const mockId2 = '223e4567-e89b-12d3-a456-426614174000';

            (uuidv4 as jest.Mock)
                .mockReturnValueOnce(mockId1)
                .mockReturnValueOnce(mockId2);

            noteService.createNote({ content: 'Note 1' });
            noteService.createNote({ content: 'Note 2' });

            const notes = noteService.getAllNotes();

            expect(notes).toHaveLength(2);
            expect(notes[0].id).toBe(mockId1);
            expect(notes[1].id).toBe(mockId2);
        });
    });

    describe('getNote', () => {
        it('should return undefined for non-existent note', () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            const note = noteService.getNote(mockId);
            expect(note).toBeUndefined();
        });

        it('should return a note with matching ID', () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            (uuidv4 as jest.Mock).mockReturnValue(mockId);

            noteService.createNote({ content: 'Test note' });
            const note = noteService.getNote(mockId);

            expect(note).toBeDefined();
            expect(note?.id).toBe(mockId);
        });

        it('should throw an error when ID is invalid', () => {
            expect(() => noteService.getNote('invalid-id')).toThrow(ValidationError);
            expect(() => noteService.getNote(123 as any)).toThrow(ValidationError);
        });
    });

    describe('deleteNote', () => {
        it('should throw NotFoundError when deleting non-existent note', () => {
            expect(() => noteService.deleteNote('123e4567-e89b-12d3-a456-426614174000'))
                .toThrow(NotFoundError);
        });

        it('should delete a note with matching ID', () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            (uuidv4 as jest.Mock).mockReturnValue(mockId);

            noteService.createNote({ content: 'Test note' });

            const deleted = noteService.deleteNote(mockId);
            const notes = noteService.getAllNotes();

            expect(deleted).toBe(true);
            expect(notes).toHaveLength(0);
        });

        it('should throw an error when ID is invalid', () => {
            expect(() => noteService.deleteNote('invalid-id')).toThrow(ValidationError);
            expect(() => noteService.deleteNote(123 as any)).toThrow(ValidationError);
        });
    });

    describe('clearNotes', () => {
        it('should clear all notes', () => {
            noteService.createNote({ content: 'Note 1' });
            noteService.createNote({ content: 'Note 2' });

            noteService.clearNotes();
            const notes = noteService.getAllNotes();

            expect(notes).toHaveLength(0);
        });
    });
}); 