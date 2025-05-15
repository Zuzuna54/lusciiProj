import rateLimit from 'express-rate-limit';

/**
 * Default rate limiter for general API endpoints
 * Allows 100 requests per 15 minutes per IP
 */
export const defaultLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
            status: 429,
            message: 'Too many requests, please try again later'
        }
    }
});

/**
 * Stricter rate limiter for write operations (POST, PUT, DELETE)
 * Allows 30 requests per 15 minutes per IP
 */
export const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
            status: 429,
            message: 'Too many write requests, please try again later'
        }
    }
}); 