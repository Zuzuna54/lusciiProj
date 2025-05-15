import app from './app';
import logger from './utils/logger';

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
const gracefulShutdown = (signal: string): void => {
    logger.info(`Received ${signal}, shutting down gracefully`);
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });

    // Force close after 10s
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server; 