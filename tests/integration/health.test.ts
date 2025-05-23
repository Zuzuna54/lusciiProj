import request from 'supertest';
import app from '../../src/app';

describe('Health Endpoint', () => {
    it('should return a 200 status code and health status', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'ok');
        expect(response.body).toHaveProperty('environment');
    });
}); 