# AWS Lambda Deployment Guide

This guide provides instructions for deploying the Notes API as a serverless application using AWS Lambda, API Gateway, DynamoDB, and related services.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 14+ and npm
- Serverless Framework or AWS SAM CLI (optional but recommended)

## Architecture Overview

The Notes API serverless architecture consists of:

- **AWS Lambda**: Hosts the API code
- **Amazon API Gateway**: Manages API endpoints and routing
- **Amazon DynamoDB**: Stores note data
- **Amazon Cognito**: Handles user authentication
- **Amazon CloudWatch**: Monitors API performance and logs
- **AWS CloudFormation**: Manages infrastructure as code

Refer to the architecture diagrams in the `/docs/diagrams` directory for visual representations.

## Setup DynamoDB Tables

1. Create the main notes table

## Setup Amazon Cognito

1. Create a User Pool:

2. Create a User Pool Client:

## Preparing the Application for AWS Lambda

1. Install required dependencies:

2. Create a Lambda handler wrapper (`src/lambda.ts`):

## Deploy Using Serverless Framework (Option 1)

1. Install the Serverless Framework:

2. Create a `serverless.yml` file:

3. Deploy:

## Deploy Using AWS SAM (Option 2)

1. Install AWS SAM CLI according to [AWS documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

2. Create a `template.yaml` file:

3. Build the application:

4. Deploy:

## Monitoring and Observability

Set up CloudWatch Alarms for important metrics:

1. Lambda Duration and Errors
2. API Gateway 4xx and 5xx errors
3. DynamoDB read/write capacity and throttled requests

## Security Best Practices

1. Restrict IAM permissions to the minimum required
2. Enable AWS WAF for additional protection against common web exploits
3. Configure logging for all services
4. Enable encryption at rest for DynamoDB
5. Regularly update dependencies and Lambda runtimes
