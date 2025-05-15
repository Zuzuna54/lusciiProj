/**
 * Simple logger utility
 */
export default {
    /**
     * Log info level messages
     * @param message - Message to log
     * @param meta - Additional metadata
     */
    info(message: string, meta?: Record<string, unknown>): void {
        console.log(`[INFO] ${message}`, meta ? sanitize(meta) : '');
    },

    /**
     * Log warning level messages
     * @param message - Message to log
     * @param meta - Additional metadata
     */
    warn(message: string, meta?: Record<string, unknown>): void {
        console.warn(`[WARN] ${message}`, meta ? sanitize(meta) : '');
    },

    /**
     * Log error level messages
     * @param message - Message to log
     * @param error - Error object
     * @param meta - Additional metadata
     */
    error(message: string, error?: Error, meta?: Record<string, unknown>): void {
        console.error(`[ERROR] ${message}`);
        if (error) {
            console.error(`[ERROR] ${error.message}`);
            console.error(`[ERROR] ${error.stack}`);
        }
        if (meta) {
            console.error('[ERROR] Additional info:', sanitize(meta));
        }
    },

    /**
     * Log HTTP request
     * @param method - HTTP method
     * @param url - Request URL
     * @param status - HTTP status code
     * @param responseTime - Response time in ms
     */
    http(method: string, url: string, status: number, responseTime: number): void {
        console.log(`[HTTP] ${method} ${url} ${status} ${responseTime}ms`);
    },

    /**
     * Sanitize sensitive data from logs
     * @param obj - Object to sanitize
     * @returns Sanitized object
     */
    sanitize(obj: unknown): unknown {
        // Handle null, undefined, or primitive types
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return obj;
        }

        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => this.sanitize(item));
        }

        // Handle objects
        const result: Record<string, unknown> = { ...obj as Record<string, unknown> };

        // Sanitize common sensitive fields
        const sensitiveFields = ['password', 'token', 'authorization', 'key', 'secret'];

        for (const key of Object.keys(result)) {
            if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                result[key] = '[REDACTED]';
            } else if (typeof result[key] === 'object' && result[key] !== null) {
                result[key] = this.sanitize(result[key]);
            }
        }

        return result;
    }
};

/**
 * Sanitize data to remove sensitive information
 * @param data - Data to sanitize
 * @returns Sanitized data
 */
function sanitize(data: unknown): unknown {
    // Handle null, undefined, or primitive types
    if (data === null || data === undefined || typeof data !== 'object') {
        return data;
    }

    // Handle arrays
    if (Array.isArray(data)) {
        return data.map(item => sanitize(item));
    }

    // Handle objects
    const sanitized: Record<string, unknown> = {};
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'authorization', 'apiKey'];

    for (const key in data as Record<string, unknown>) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (sensitiveFields.includes(key.toLowerCase())) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof data[key as keyof typeof data] === 'object' && data[key as keyof typeof data] !== null) {
                sanitized[key] = sanitize(data[key as keyof typeof data]);
            } else {
                sanitized[key] = data[key as keyof typeof data];
            }
        }
    }

    return sanitized;
} 