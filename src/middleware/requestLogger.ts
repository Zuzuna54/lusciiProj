import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Middleware to log HTTP requests
 */
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Get current timestamp
    const start = Date.now();

    // Log request when response is finished
    res.on('finish', () => {
        const responseTime = Date.now() - start;

        // Log the request
        logger.http(
            req.method,
            req.originalUrl,
            res.statusCode,
            responseTime
        );
    });

    next();
}; 