import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

/**
 * Configure security headers using helmet
 */
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"]
        }
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    hsts: {
        maxAge: 15552000, // 180 days in seconds
        includeSubDomains: true
    }
});

/**
 * Custom middleware to remove fingerprinting headers
 */
export const removeFingerprinting = (_req: Request, res: Response, next: NextFunction): void => {
    // Remove headers that might reveal server information
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');

    next();
}; 