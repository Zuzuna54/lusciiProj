/**
 * Base error class for application errors
 */
export class AppError extends Error {
    status: number;
    details?: string[];

    constructor(message: string, status: number = 500, details?: string[]) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.details = details;

        // For proper prototype chain when extending Error
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

/**
 * Error for resources not found
 */
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found', details?: string[]) {
        super(message, 404, details);

        // For proper prototype chain
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed', details?: string[]) {
        super(message, 400, details);

        // For proper prototype chain
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

/**
 * Error for internal server errors
 */
export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error', details?: string[]) {
        super(message, 500, details);

        // For proper prototype chain
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
} 