import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler, notFoundHandler, setupGlobalErrorHandlers } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { securityHeaders, removeFingerprinting } from './middleware/security';
import { defaultLimiter } from './middleware/rateLimiter';
import logger from './utils/logger';

// Set up global error handlers
setupGlobalErrorHandlers();

// Initialize Express app
const app = express();

// Security middleware
app.use(securityHeaders);
app.use(removeFingerprinting);

// Basic middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(defaultLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    logger.info('Health check endpoint accessed');
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// 404 handler for undefined routes
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app; 