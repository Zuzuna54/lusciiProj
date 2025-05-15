import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import logger from '../utils/logger';

/**
 * Sets up Swagger UI for API documentation
 */
export function setupSwaggerDocs(app: express.Application): void {
    try {
        // Load the OpenAPI specification
        const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/api-spec.yaml'));

        // Set up the Swagger UI route
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: 'Notes API Documentation'
        }));

        logger.info('Swagger UI initialized at /api-docs');
    } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        logger.error('Failed to initialize Swagger UI', errorObj);
    }
} 