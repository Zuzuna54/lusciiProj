import app from './app';

// Get port from environment variable or use default
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled rejection:', err);
    // Close server and exit process
    server.close(() => process.exit(1));
});

export default server; 