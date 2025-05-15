import { Request, Response } from 'express';
import { errorHandler, notFoundHandler } from '../../../src/middleware/errorHandler';
import { AppError, ValidationError, NotFoundError } from '../../../src/utils/errors';
import logger from '../../../src/utils/logger';

// Mock logger
jest.mock('../../../src/utils/logger', () => ({
    error: jest.fn(),
    warn: jest.fn(),
    sanitize: jest.fn().mockImplementation(data => data)
}));

describe('Error Handler Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            path: '/test',
            method: 'GET',
            ip: '127.0.0.1',
            body: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockNext = jest.fn();

        jest.clearAllMocks();
    });

    describe('errorHandler', () => {
        it('should handle AppError with correct status and message', () => {
            const error = new AppError('Test error', 400);

            errorHandler(
                error,
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(logger.error).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    status: 400,
                    message: 'Test error'
                }
            });
        });

        it('should handle ValidationError with details', () => {
            const error = new ValidationError('Validation failed', ['Field is required']);

            errorHandler(
                error,
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    status: 400,
                    message: 'Validation failed',
                    details: ['Field is required']
                }
            });
        });

        it('should handle NotFoundError', () => {
            const error = new NotFoundError('Resource not found');

            errorHandler(
                error,
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    status: 404,
                    message: 'Resource not found'
                }
            });
        });

        it('should return 500 for generic Error without exposing details', () => {
            const error = new Error('Internal implementation error');

            errorHandler(
                error,
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    status: 500,
                    message: 'Internal server error'
                }
            });
            // The actual error message should not be exposed
            expect(mockResponse.json).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.objectContaining({
                        message: 'Internal implementation error'
                    })
                })
            );
        });
    });

    describe('notFoundHandler', () => {
        it('should return 404 with route information', () => {
            // Create a fresh mockRequest for this test
            const notFoundReq = {
                method: 'GET',
                path: '/unknown',
                ip: '127.0.0.1'
            };

            notFoundHandler(notFoundReq as Request, mockResponse as Response);

            expect(logger.warn).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    status: 404,
                    message: 'Route not found: GET /unknown'
                }
            });
        });
    });
}); 