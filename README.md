# AI Quizzer Backend

This project implements the backend service for an AI-powered quiz application. The app allows users to generate quizzes, submit answers, view quiz history, and retry previous quizzes. The backend is built using Node.js, Express.js, MongoDB, and integrated with JWT-based authentication. It is containerized using Docker and can be deployed on platforms like Docker Hub and Render.

## Features

- **User Signup**: Create new user accounts.
- **User Login & JWT Authentication**: Mock authentication using JWT tokens.
- **AI Quiz Generation**: Generate quizzes based on grade and subject using AI.
- **Quiz Submission**: Submit answers for evaluation and receive scores.
- **Quiz History Retrieval**: View quiz history with filters such as grade, subject, and marks.
- **Retry Quiz**: Allows users to retry previously completed quizzes.

## Available API Endpoints

### 1. User Signup

- **Endpoint**: `POST /user/signup`
- **Description**: Registers a new user account.

### 2. User Login

- **Endpoint**: `POST /user/login`
- **Description**: Authenticates a user and returns a JWT.

### 3. Create Quiz

- **Endpoint**: `POST /quiz/create`
- **Description**: Generates a new quiz based on the grade and subject.

### 4. Submit Quiz

- **Endpoint**: `POST /quiz/submit`
- **Description**: Submits quiz answers and returns the evaluated score.

### 5. Get Quiz History

- **Endpoint**: `GET /quiz/quizhistory`
- **Description**: Retrieves the history of quizzes based on filters.

- **Filters Available**:
  - By grade: `/quiz/quizhistory/grade/{grade}`
  - By subject: `/quiz/quizhistory/subject/{subject}`
  - By marks: `/quiz/quizhistory/marks/{marks}`
  - By date range: `/quiz/quizhistory/daterange/{from}/{to}`

### 6. Retry Quiz

- **Endpoint**: `GET /quiz/retry`
- **Description**: Allows retrying a previously completed quiz.

### 7. Submit Retried Quiz

- **Endpoint**: `GET /retry/submit`
- **Description**: Submits the retried quiz and re-evaluates the score.

## Deployment

The AI Quizzer backend has been deployed on Render using the Docker image hosted on Docker Hub. You can access the live version of the backend at the following URL:

https://ai-quizzer-latest.onrender.com

### Docker Image

The application is containerized using Docker and available on Docker Hub. To pull the Docker image, run the following command:

```bash
docker pull morphs/ai-quizzer
