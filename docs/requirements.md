# Goal

We want to get a sense of your approach to designing and implementing backend logic, your coding style, and your ability to communicate your technical decisions. We value clarity and good thinking over fancy frameworks.

# Context

At Luscii, we're building scalable and secure applications in a serverless environment. Imagine we're developing a lightweight internal Notes API, which might later be integrated into a larger digital health app.

# Assignment

Build a small API with three endpoints:

- `POST /notes` — Add a new note
- `GET /notes` — Retrieve all notes
- `DELETE /notes/:id` — Delete a note by ID

# Requirements

- Use Node.js (with or without TypeScript)
- Use in-memory storage (you do not need to use a real database)
- Handle errors securely (e.g., avoid exposing stack traces or internal logic)
- Include unit tests
- Keep your code clear and maintainable

# Deliverables

Please include:

- Your code in a GitHub repo
- A short README.md that explains:
  - Your design choices
  - How this would be implemented using AWS Lambda and DynamoDB
  - How you would add authentication (e.g., using AWS Cognito or IAM)
  - How you would document and share this API in a real team setting

# Time Estimation

Please don't overengineer — we're not looking for a complete app, just thoughtful code and clear thinking.

# What We're Looking For

- Clear and readable code
- Secure handling of inputs and errors
- Reasonable choices and justifications
- A mindset of scalability and collaboration

# Bonus

- Clean test structure and modular design
