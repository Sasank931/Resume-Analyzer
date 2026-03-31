# Smart Resume Analyzer & Interview Readiness System

A full-stack application that analyzes PDF resumes against specific job roles to determine interview readiness.

## Overview

This project is a web-based tool designed to help job seekers prepare for interviews by providing automated feedback on their resumes. Users can register, log in, and upload their PDF resumes. The system then analyzes the resume against a selected job profile, identifies skill gaps, and provides a readiness score.

For detailed instructions on how to set up and run this project, please see [SETUP.md](SETUP.md).

## Project Structure

-   `backend/`: Spring Boot REST API that handles user authentication, resume processing, and analysis.
-   `frontend/`: React + Vite single-page application that provides the user interface.

## Core Technologies

-   **Backend:** Java 17, Spring Boot, Spring Data JPA, H2 Database, Apache PDFBox
-   **Frontend:** React, Vite, Axios, React Router, Bootstrap 5
