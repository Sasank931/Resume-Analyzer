# Smart Resume Analyzer & Interview Readiness System

A full-stack application that analyzes PDF resumes against specific job roles to determine interview readiness.

## Project Structure
- `backend/`: Spring Boot REST API
- `frontend/`: React + Vite frontend

## Technologies Used
- **Backend:** Java 17, Spring Boot 3.2.4, Spring Security, Spring Data JPA, H2 Database, Apache PDFBox
- **Frontend:** React, Vite, Axios, React Router, Bootstrap 5, Bootstrap Icons

## Getting Started

### Backend
1. Navigate to `backend/`
2. Run `./mvnw spring-boot:run`
3. The API will be available at `http://localhost:8080`
4. H2 Console: `http://localhost:8080/h2-console`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm run dev`
4. The application will be available at `http://localhost:5173`

## Features
- **User Authentication:** Secure registration and login.
- **Resume Upload:** Upload PDF resumes for analysis.
- **Skill Detection:** Automatically extracts technical skills from PDF.
- **Readiness Scoring:** Calculates a percentage score based on role requirements.
- **Personalized Suggestions:** Identifies missing skills and provides learning recommendations.
- **Analysis History:** Registered users can view their previous resume analyses.
