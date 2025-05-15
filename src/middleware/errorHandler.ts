import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';

/**
 * Global error handler middleware
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void => {
    logger.error('Error processing request', err, {
        path: req.path,
        method: req.method,
        ip: req.ip,
        body: logger.sanitize(req.body)
    });

    // Handle our custom errors
    if (err instanceof AppError) {
        res.status(err.status).json({
            error: {
                status: err.status,
                message: err.message,
                ...(err.details && { details: err.details })
            }
        });
        return;
    }

    // Handle validation errors from express-validator (if used)
    if (Array.isArray(err) && err.length > 0 && err[0].msg) {
        res.status(400).json({
            error: {
                status: 400,
                message: 'Validation failed',
                details: err.map(e => e.msg)
            }
        });
        return;
    }

    // Default case - don't expose internal details
    res.status(500).json({
        error: {
            status: 500,
            message: 'Internal server error'
        }
    });
};

/**
 * Handle 404 not found for routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
    logger.warn(`Route not found: ${req.method} ${req.path}`);

    res.status(404).json({
        error: {
            status: 404,
            message: `Route not found: ${req.method} ${req.path}`
        }
    });
};

/**
 * Set up global error handlers for uncaught exceptions and unhandled rejections
 */
export const setupGlobalErrorHandlers = (): void => {
    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
        logger.error('Uncaught Exception', error);
        // Give the logger time to log before exiting
        setTimeout(() => {
            process.exit(1);
        }, 500);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
        logger.error(
            'Unhandled Rejection',
            reason instanceof Error ? reason : new Error(String(reason))
        );
        // Don't exit the process here to allow graceful handling
    });
}; 