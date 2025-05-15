# Phase 2: Core API Functionality

Building on the foundation established in Phase 1, this phase focuses on implementing the core functionality of our Notes API, including the data store and the three required endpoints.

## Tasks

### 2.1 Design Data Models

- Create a Note model (`src/models/note.ts`) with the following properties:
  - `id`: string (UUID)
  - `content`: string
  - `createdAt`: Date
  - `updatedAt`: Date
- Define interfaces/types for the Note model (if using TypeScript)
- Create validation functions for the Note model

### 2.2 Implement In-Memory Data Store

- Create a data service (`src/services/noteService.ts`)
- Implement an in-memory storage mechanism using JavaScript arrays or objects
- Create the following data access methods:
  - `createNote(content)`: Creates a new note with a unique ID
  - `getAllNotes()`: Returns all notes
  - `getNote(id)`: Returns a specific note by ID
  - `deleteNote(id)`: Deletes a note by ID
  - `clearNotes()` (for testing purposes): Clears all notes

### 2.3 Implement Controllers

- Create a notes controller (`src/controllers/notesController.ts`) with the following methods:
  - `createNote`: Handles POST /notes requests
  - `getNotes`: Handles GET /notes requests
  - `deleteNote`: Handles DELETE /notes/:id requests
- Controllers should use the data service methods implemented in 2.2
- Include basic input validation and response formatting

### 2.4 Connect Routes to Controllers

- Update the routes created in Phase 1 to connect to the newly implemented controllers
- Ensure proper HTTP methods are used for each endpoint
- Implement route parameters for DELETE endpoint

### 2.5 Implement Basic Request Validation

- Add validation for the POST request body
  - Ensure content is provided
  - Validate content is a string
  - Implement maximum length validation
- Add validation for the DELETE request parameter
  - Validate ID format (if using UUID)

### 2.6 Basic Response Formatting

- Implement consistent JSON response formatting:
  - For successful operations, return the resource or a success message
  - For POST requests, return 201 status code and the created resource
  - For GET requests, return 200 status code and the requested resources
  - For DELETE requests, return 204 status code (no content)
- Use appropriate HTTP status codes for different scenarios

## Acceptance Criteria

- All three required endpoints are implemented and functional
- In-memory data store correctly maintains notes between API calls
- Notes are created with unique IDs
- Basic validation is in place for request inputs
- API returns appropriate status codes and consistent response formats
- Manual testing confirms all endpoints work as expected:
  - POST /notes creates a new note
  - GET /notes returns all notes
  - DELETE /notes/:id removes the specified note

## Next Steps

Once Phase 2 is complete, we'll have a functional Notes API. In Phase 3, we'll focus on enhancing error handling and implementing security measures to ensure the API is robust and secure.
