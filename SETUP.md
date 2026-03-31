# Project Setup Guide

This guide provides detailed instructions on how to set up and run the Smart Resume Analyzer project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Java Development Kit (JDK) 17 or later:** Required to run the Spring Boot backend.
-   **Node.js and npm:** Required for the React frontend. We recommend using the latest LTS version.
-   **Git:** For cloning the repository.

## Step 1: Clone the Repository

First, clone the project repository to your local machine using Git:

```bash
git clone <repository-url>
cd <repository-directory>
```

## Step 2: Set Up and Run the Backend

The backend is a Spring Boot application. It is configured to use an in-memory H2 database, so no external database setup is required.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Run the application:**

    The most reliable way to run the backend is by using the pre-built JAR file located in the `target` directory.

    ```bash
    java -jar target/resume-analyzer-0.0.1-SNAPSHOT.jar
    ```

    The backend server will start on `http://localhost:8080`.

    You can also access the H2 database console in your browser at `http://localhost:8080/h2-console` to inspect the data. Use the default credentials to log in.

## Step 3: Set Up and Run the Frontend

The frontend is a React application built with Vite.

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    This command will download and install all the necessary packages for the React application.

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The frontend development server will start, and you can access the application in your web browser at `http://localhost:5173`.

## Step 4: Access the Application

With both the backend and frontend servers running, you can now use the Smart Resume Analyzer:

-   **Open your browser** and navigate to `http://localhost:5173`.
-   You will be directed to the login page. From here, you can register a new account or log in if you already have one.

That's it! The application is now fully set up and ready for you to use.
