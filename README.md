# Notes API

A RESTful API for managing notes built with Node.js, Express, and TypeScript. Currently using an in-memory data store, with plans to migrate to AWS DynamoDB.

## Project Overview

The Notes API is a lightweight service that allows users to create, read, and delete notes. It follows best practices for RESTful API design, including proper error handling, input validation, and security measures. The project is structured to facilitate a future migration to AWS serverless architecture.

## Features

- **Create, Read, and Delete notes** via RESTful endpoints
- **Interactive API documentation** with Swagger UI
- **In-memory data store** (with planned migration to DynamoDB)
- **Comprehensive error handling** with custom error classes
- **Input validation** for all API requests
- **Security measures** including rate limiting, CORS, and secure HTTP headers
- **Logging and monitoring** capabilities
- **Unit and integration tests** for all components

## Project Structure

The Notes API follows a clean, layered architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and data operations
- **Models**: Define data structures and interfaces
- **Middleware**: Process requests (validation, logging, error handling)
- **Routes**: Define API endpoints and connect to controllers
- **Utils**: Provide helper functions and utilities

## Architecture Diagrams

The project includes several diagrams to visualize its architecture and planned AWS integration:

- [Project Architecture](docs/diagrams/project-architecture.mmd) - Overall component structure
- [AWS Architecture](docs/diagrams/aws-architecture.mmd) - Planned serverless architecture
- [DynamoDB Structure](docs/diagrams/dynamodb-structure.mmd) - Future database design
- [Authentication Flow](docs/diagrams/authentication-flow.mmd) - Planned authentication process
- [Monitoring Strategy](docs/diagrams/monitoring-strategy.mmd) - Observability approach

## Development Phases

The project follows a phased development approach:

1. [Project Setup and Basic Structure](docs/phases/phase1.md) - Foundation and initial setup
2. [Core API Functionality](docs/phases/phase2.md) - In-memory implementation of CRUD operations
3. [Error Handling and Security](docs/phases/phase3.md) - Robustness and security features
4. [Documentation and AWS Integration Plan](docs/phases/index.md) - API documentation and cloud planning

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/notes-api.git
   cd notes-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

The server will start on port 3000 by default (http://localhost:3000).

### API Documentation with Swagger UI

The API includes interactive documentation using Swagger UI, which allows you to explore and test all endpoints directly from your browser:

1. Start the server using `npm run dev`
2. Navigate to http://localhost:3000/api-docs in your browser
3. Use the Swagger UI interface to view endpoint details and test API functionality

## API Endpoints

### Health Check

```
GET /health
```

Returns the API health status and current environment.

### Notes Endpoints

```
GET /api/notes
```

Retrieves all notes.

```
POST /api/notes
```

Creates a new note. Requires a JSON body with `content` field.

```
DELETE /api/notes/:id
```

Deletes a note by ID.

## Testing

The project includes both unit and integration tests:

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Testing Strategy

- **Unit tests** verify individual components in isolation
- **Integration tests** verify API endpoints with HTTP requests
- **Test coverage** targets >80% across all components

## Error Handling

The API implements a centralized error handling mechanism with custom error classes:

- **AppError**: Base error class
- **ValidationError**: For request validation errors
- **NotFoundError**: For resource not found errors

All errors are properly logged and returned to clients in a consistent JSON format.

## Security Features

- **Helmet**: Secure HTTP headers
- **Rate limiting**: Prevent abuse and DoS attacks
- **CORS**: Configured for cross-origin requests
- **Request validation**: Prevents invalid data and injection attacks
- **Error sanitization**: Prevents leaking implementation details

## AWS Integration Plan

The Notes API is designed to be deployed on AWS with the following components:

1. **AWS Lambda**: For serverless compute
2. **Amazon API Gateway**: For request handling and routing
3. **Amazon DynamoDB**: For data persistence
4. **Amazon CloudWatch**: For logging and monitoring
5. **AWS CloudFormation**: For infrastructure as code
6. **Amazon Cognito**: For user authentication

See the [AWS Architecture Diagram](docs/diagrams/aws-architecture.mmd) for a visual representation.

## License

MIT
