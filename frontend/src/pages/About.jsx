import React from 'react';

const About = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5 animate-fade-in">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">About the Project</span>
            <h1 className="display-4 fw-bold mb-4">Empowering Career Growth</h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
              Smart Resume Analyzer is an AI-driven tool designed to bridge the gap between academic learning and industry expectations.
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6 animate-fade-in">
              <div className="card h-100 p-4 p-lg-5 border-0 shadow-lg rounded-4">
                <div className="feature-icon bg-primary text-white mb-4">
                  <i className="bi bi-lightbulb-fill"></i>
                </div>
                <h3 className="fw-bold mb-4">Our Mission</h3>
                <p className="text-muted fs-5">
                  Our mission is to help students and job seekers identify their skill gaps and improve their employability by providing real-time, data-driven feedback on their resumes.
                </p>
                <p className="text-muted">
                  By analyzing thousands of job descriptions and industry standards, we provide accurate readiness scores for various technical roles.
                </p>
              </div>
            </div>
            <div className="col-md-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="card h-100 p-4 p-lg-5 border-0 shadow-lg rounded-4">
                <div className="feature-icon bg-success text-white mb-4">
                  <i className="bi bi-gear-fill"></i>
                </div>
                <h3 className="fw-bold mb-4">How it Works</h3>
                <p className="text-muted fs-5">
                  The system uses advanced text extraction techniques to parse PDF resumes and identify technical skills.
                </p>
                <ul className="list-unstyled mt-4">
                  <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>PDF parsing and text extraction</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>Skill matching against industry roles</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>Gap analysis and score calculation</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-3"></i>
                    <span>Personalized learning suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5 bg-secondary text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-4">B.Tech Mini Project 2026</h2>
                <p className="lead opacity-75 mb-0">
                  This project was developed as a comprehensive demonstration of full-stack development using modern technologies like Spring Boot, React, and RESTful APIs.
                </p>
              </div>
              <div className="col-lg-4 text-center mt-4 mt-lg-0">
                <div className="d-inline-flex flex-wrap justify-content-center gap-2">
                  <span className="badge bg-white text-dark px-3 py-2">Java</span>
                  <span className="badge bg-white text-dark px-3 py-2">Spring Boot</span>
                  <span className="badge bg-white text-dark px-3 py-2">React</span>
                  <span className="badge bg-white text-dark px-3 py-2">REST API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
