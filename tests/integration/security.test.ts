import request from 'supertest';
import app from '../../src/app';

describe('Security Features', () => {
    describe('Security Headers', () => {
        it('should include Content-Security-Policy header', async () => {
            const response = await request(app).get('/health');
            expect(response.headers).toHaveProperty('content-security-policy');
        });

        it('should include X-XSS-Protection header', async () => {
            const response = await request(app).get('/health');
            expect(response.headers).toHaveProperty('x-xss-protection');
        });

        it('should include X-Content-Type-Options header', async () => {
            const response = await request(app).get('/health');
            expect(response.headers).toHaveProperty('x-content-type-options');
        });

        it('should not include X-Powered-By header', async () => {
            const response = await request(app).get('/health');
            expect(response.headers).not.toHaveProperty('x-powered-by');
        });
    });

    describe('Error Handling', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app).get('/nonexistent-route');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toHaveProperty('status', 404);
            expect(response.body.error).toHaveProperty('message', 'Route not found: GET /nonexistent-route');
        });

        it('should not expose stack traces in errors', async () => {
            const response = await request(app)
                .delete('/api/notes/invalid-id')
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).not.toHaveProperty('stack');
        });
    });
}); 