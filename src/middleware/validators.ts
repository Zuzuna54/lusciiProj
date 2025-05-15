import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

/**
 * Middleware to validate request
 */
export const validate = (req: Request, _res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map(err => err.msg);
        throw new ValidationError('Validation failed', details);
    }
    next();
};

/**
 * Validators for creating a note
 */
export const validateCreateNote = [
    body('content')
        .exists()
        .withMessage('Content is required')
        .notEmpty()
        .withMessage('Content cannot be empty')
        .isString()
        .withMessage('Content must be a string')
        .isLength({ max: 1000 })
        .withMessage('Content must be less than 1000 characters'),
    validate
];

/**
 * Validators for deleting a note
 */
export const validateNoteId = [
    param('id')
        .exists()
        .withMessage('ID is required')
        .notEmpty()
        .withMessage('ID cannot be empty')
        .isString()
        .withMessage('ID must be a string')
        .isUUID()
        .withMessage('ID must be a valid UUID'),
    validate
]; 