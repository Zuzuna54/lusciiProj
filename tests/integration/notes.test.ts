import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../../src/app';
import noteService from '../../src/services/noteService';

// Mock uuid module
jest.mock('uuid', () => ({
    v4: jest.fn()
}));

describe('Notes API', () => {
    beforeEach(() => {
        // Clear all notes before each test
        noteService.clearNotes();
        jest.clearAllMocks();
    });

    describe('POST /notes', () => {
        it('should create a new note with valid content', async () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            (uuidv4 as jest.Mock).mockReturnValue(mockId);

            const response = await request(app)
                .post('/api/notes')
                .send({ content: 'Test note' })
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id', mockId);
            expect(response.body.data).toHaveProperty('content', 'Test note');
            expect(response.body.data).toHaveProperty('createdAt');
            expect(response.body.data).toHaveProperty('updatedAt');
        });

        it('should return 400 if content is missing', async () => {
            const response = await request(app)
                .post('/api/notes')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toHaveProperty('status', 400);
            expect(response.body.error).toHaveProperty('message', 'Validation failed');
            expect(response.body.error).toHaveProperty('details');
        });

        it('should return 400 if content is empty', async () => {
            const response = await request(app)
                .post('/api/notes')
                .send({ content: '' })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toHaveProperty('status', 400);
            expect(response.body.error).toHaveProperty('message', 'Validation failed');
            expect(response.body.error).toHaveProperty('details');
        });
    });

    describe('GET /notes', () => {
        it('should return an empty array when no notes exist', async () => {
            const response = await request(app)
                .get('/api/notes')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data).toHaveLength(0);
            expect(response.body).toHaveProperty('meta');
            expect(response.body.meta).toHaveProperty('total', 0);
        });

        it('should return all notes', async () => {
            const mockId1 = '123e4567-e89b-12d3-a456-426614174000';
            const mockId2 = '223e4567-e89b-12d3-a456-426614174000';

            (uuidv4 as jest.Mock)
                .mockReturnValueOnce(mockId1)
                .mockReturnValueOnce(mockId2);

            await noteService.createNote({ content: 'Note 1' });
            await noteService.createNote({ content: 'Note 2' });

            const response = await request(app)
                .get('/api/notes')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data).toHaveLength(2);
            expect(response.body.meta).toHaveProperty('total', 2);
            expect(response.body.data[0]).toHaveProperty('id', mockId1);
            expect(response.body.data[1]).toHaveProperty('id', mockId2);
        });
    });

    describe('DELETE /notes/:id', () => {
        it('should return 204 when deleting an existing note', async () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';
            (uuidv4 as jest.Mock).mockReturnValue(mockId);

            await noteService.createNote({ content: 'Test note' });

            await request(app)
                .delete(`/api/notes/${mockId}`)
                .expect(204);

            // Verify note was deleted
            const notes = noteService.getAllNotes();
            expect(notes).toHaveLength(0);
        });

        it('should return 404 when deleting a non-existent note', async () => {
            const mockId = '123e4567-e89b-12d3-a456-426614174000';

            const response = await request(app)
                .delete(`/api/notes/${mockId}`)
                .expect('Content-Type', /json/)
                .expect(404);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toHaveProperty('status', 404);
            expect(response.body.error).toHaveProperty('message', `Note with ID ${mockId} not found`);
        });

        it('should return 400 when deleting with an invalid ID', async () => {
            const response = await request(app)
                .delete('/api/notes/invalid-id')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toHaveProperty('status', 400);
            expect(response.body.error).toHaveProperty('message', 'Validation failed');
            expect(response.body.error).toHaveProperty('details');
        });
    });
}); 