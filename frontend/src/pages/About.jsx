import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-5 border-0 shadow-lg rounded-4">
            <h2 className="fw-bold text-primary mb-4 text-center">About Smart Resume Analyzer</h2>
            <p className="lead mb-4">
              The Smart Resume Analyzer is a powerful tool designed to help job seekers understand their interview readiness and identify skill gaps for specific technical roles.
            </p>
            
            <h5 className="fw-bold mb-3"><i className="bi bi-gear-fill me-2 text-primary"></i> How it Works</h5>
            <p className="text-muted">
              Our system uses advanced text processing to extract skills from your PDF resume. It then compares these skills against a curated database of required skills for various job roles, calculating an "Interview Readiness Score" and providing personalized suggestions.
            </p>

            <h5 className="fw-bold mb-3 mt-4"><i className="bi bi-star-fill me-2 text-warning"></i> Key Features</h5>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item border-0 ps-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i> <strong>PDF Skill Extraction:</strong> Automatic detection of technical skills from PDF resumes.
              </li>
              <li className="list-group-item border-0 ps-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Role-Specific Analysis:</strong> Tailored feedback based on your desired job role.
              </li>
              <li className="list-group-item border-0 ps-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Readiness Scoring:</strong> Instant percentage-based feedback on your job readiness.
              </li>
              <li className="list-group-item border-0 ps-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i> <strong>Skill Gap Analysis:</strong> Clearly identify missing skills you need to learn.
              </li>
            </ul>

            <div className="alert alert-info border-0 rounded-4 p-4 mt-4">
              <h6 className="fw-bold"><i className="bi bi-info-circle-fill me-2"></i> Project Info</h6>
              <p className="mb-0 small">A Smart Resume Analyzer system powered by Java, Spring Boot, and React.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
