import express, { Application, Request, Response, NextFunction } from 'express';
import routes from './routes';

// Initialize Express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

// 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        error: {
            status: 404,
            message: 'Resource not found'
        }
    });
});

// Basic error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            status: 500,
            message: 'Internal server error'
        }
    });
});

export default app; 