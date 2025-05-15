# Notes API

A lightweight internal Notes API for Luscii, built with Node.js and TypeScript following serverless architecture principles.

## Overview

This project implements a simple API with three endpoints:

- `POST /notes` — Add a new note
- `GET /notes` — Retrieve all notes
- `DELETE /notes/:id` — Delete a note by ID

## Development Phases

The project development is organized into 5 logical phases:

1. **Project Setup and Basic Structure** - Foundation setup with appropriate directory structure and dependencies
2. **Core API Functionality** - Implementation of the three required endpoints with in-memory storage
3. **Error Handling and Security** - Robust error handling and security measures
4. **Testing** - Comprehensive unit and integration testing
5. **Documentation and AWS Integration Planning** - Preparation for serverless deployment

For detailed information about each phase, see the `docs/phases/` directory.

## Getting Started

To get started with development, follow the instructions in the Phase 1 documentation: [Phase 1: Project Setup and Basic Structure](docs/phases/phase1.md)

## Requirements

- Node.js 14+
- TypeScript

## License

Private - Luscii Internal Use Only
