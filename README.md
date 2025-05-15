# Notes API

A RESTful API for managing notes built with Node.js, Express, and TypeScript. Currently using an in-memory data store, with plans to migrate to AWS DynamoDB.

## Architecture

The Notes API follows a layered architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Models**: Define data structures
- **Middleware**: Process requests before they reach route handlers
- **Routes**: Define API endpoints
- **Utils**: Provide helper functions and utilities

See our architecture diagrams:

- [Project Architecture](docs/diagrams/project-architecture.mmd)
- [AWS Lambda Architecture](docs/diagrams/aws-architecture.mmd)
- [DynamoDB Structure](docs/diagrams/dynamodb-structure.mmd)
- [Authentication Flow](docs/diagrams/authentication-flow.mmd)
- [Monitoring Strategy](docs/diagrams/monitoring-strategy.mmd)

## AWS Integration Plan

The Notes API is planned to be deployed on AWS with the following infrastructure:

1. **AWS Lambda** for serverless compute
2. **Amazon API Gateway** for request handling and routing
3. **Amazon DynamoDB** for data persistence
4. **Amazon CloudWatch** for logging and monitoring
5. **AWS CloudFormation** for infrastructure as code
6. **Amazon Cognito** for user authentication

## API Documentation

API specifications are available in OpenAPI 3.0 format:

- [API Specification](docs/api-spec.yaml)

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run start
```

## Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration
```

## Error Handling

The API implements a centralized error handling mechanism with custom error classes:

- **AppError**: Base error class
- **ValidationError**: For request validation errors
- **NotFoundError**: For resource not found errors

## Security Features

- **Helmet**: Secure HTTP headers
- **Rate limiting**: Prevent abuse
- **CORS**: Configured for cross-origin requests
- **Request validation**: Prevent invalid data

## Monitoring

The API includes monitoring features:

- Request logging
- Error logging with sanitization
- Health check endpoint

## License

MIT
