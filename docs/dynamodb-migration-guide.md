# DynamoDB Migration Guide

This guide provides instructions for migrating the Notes API from an in-memory data store to Amazon DynamoDB.

## Overview

The migration involves:

1. Setting up a DynamoDB table
2. Creating a DynamoDB data access layer
3. Updating the service layer to use DynamoDB
4. Implementing a migration script to transfer existing data
5. Testing the integration

## DynamoDB Table Design

The Notes API will use a single table named `notes` with the following attributes:

| Attribute | Type       | Description                               |
| --------- | ---------- | ----------------------------------------- |
| id        | String     | Primary key (UUID)                        |
| content   | String     | Note content                              |
| createdAt | String     | ISO timestamp of creation                 |
| updatedAt | String     | ISO timestamp of last update              |
| userId    | String     | Owner of the note (partition key for GSI) |
| status    | String     | Note status (active/archived)             |
| tags      | String Set | Optional tags for the note                |

### Access Patterns

1. Get a note by ID
2. Get all notes for a user
3. Get notes by status
4. Create/update a note
5. Delete a note

## Implementing the Migration

### 1. Install Dependencies

### 2. Create DynamoDB Client Utility

### 3. Create DynamoDB Data Access Layer

### 4. Update the Note Model

### 5. Create a Migration Script

### 6. Update Service Provider

### 7. Update Controllers to Use Service Provider

### 8. Configure Environment Variables

### 9. Testing with DynamoDB Local

1. Install DynamoDB Local:

2. Create table in DynamoDB Local:

3. Run the migration script:

4. Run your tests to verify DynamoDB integration:

## Rollback Strategy

In case the migration needs to be rolled back:

1. Keep the original in-memory service implementation
2. Set `USE_DYNAMODB=false` in your environment variables
3. Restart the application
