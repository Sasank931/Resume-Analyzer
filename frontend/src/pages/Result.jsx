import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resumeService } from '../services/api';

const Result = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await resumeService.getById(id);
        setResume(data);
      } catch (err) {
        setError('Failed to fetch analysis result.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Fetching your analysis results...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error || 'Result not found.'}</div>
        <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold text-primary mb-1">Resume Analysis Result</h2>
          <p className="text-muted">
            <i className="bi bi-briefcase-fill me-1"></i> Role: <span className="fw-bold">{resume.jobRole}</span> | 
            <i className="bi bi-file-earmark-pdf me-1"></i> <span>{resume.fileName}</span>
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/" className="btn btn-outline-primary shadow-sm rounded-pill">
            <i className="bi bi-arrow-left me-1"></i> Analyze Another
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card h-100 p-4 text-center border-0 shadow-sm rounded-4">
            <h5 className="fw-bold mb-4 text-secondary">Interview Readiness</h5>
            <div 
              className="score-circle mb-3 d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: `10px solid ${resume.score < 40 ? '#e74c3c' : (resume.score <= 70 ? '#f39c12' : '#27ae60')}`,
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {resume.score}%
            </div>
            
            <div className="mt-4">
              <h6 className="fw-bold mb-2 text-muted">Current Level</h6>
              <span className={`badge fs-5 px-4 py-2 mb-3 rounded-pill shadow-sm ${
                resume.readinessLevel === 'Beginner' ? 'bg-danger' : (resume.readinessLevel === 'Intermediate' ? 'bg-warning text-dark' : 'bg-success')
              }`}>
                {resume.readinessLevel}
              </span>
              
              <div className="progress mb-2 mt-3" style={{ height: '10px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated" 
                  role="progressbar" 
                  style={{ 
                    width: `${resume.score}%`,
                    backgroundColor: resume.score < 40 ? '#e74c3c' : (resume.score <= 70 ? '#f39c12' : '#27ae60')
                  }}
                  aria-valuenow={resume.score} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row g-4">
            <div className="col-12">
              <div className="card p-4 bg-white border-0 shadow-sm rounded-4">
                <h5 className="fw-bold mb-2 text-dark">
                  <i className="bi bi-journal-text me-2 text-primary"></i> Analysis Summary
                </h5>
                <p className="mb-0 fs-5">
                  Your profile is <span className="fw-bold text-primary">{resume.score}%</span> ready for the 
                  <span className="fw-bold"> {resume.jobRole}</span> position.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-4 h-100 border-0 shadow-sm rounded-4">
                <h5 className="fw-bold mb-3 text-success">
                  <i className="bi bi-check-circle-fill me-2"></i> Matched Skills
                </h5>
                <hr className="mt-0 mb-3 opacity-10" />
                {resume.foundSkills.length === 0 ? (
                  <div className="text-muted small italic">No matching skills detected for this specific role.</div>
                ) : (
                  <div className="d-flex flex-wrap gap-2">
                    {resume.foundSkills.map((skill, index) => (
                      <span key={index} className="badge bg-success shadow-sm border-0 px-3 py-2 rounded-pill">
                        <i className="bi bi-check2 me-1"></i> {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-4 h-100 border-0 shadow-sm rounded-4">
                <h5 className="fw-bold mb-3 text-danger">
                  <i className="bi bi-exclamation-circle-fill me-2"></i> Missing Skills
                </h5>
                <hr className="mt-0 mb-3 opacity-10" />
                {resume.missingSkills.length === 0 ? (
                  <div className="text-success small fw-bold">Great job! You have all the core required skills.</div>
                ) : (
                  <div className="d-flex flex-wrap gap-2">
                    {resume.missingSkills.map((skill, index) => (
                      <span key={index} className="badge bg-danger shadow-sm border-0 px-3 py-2 rounded-pill">
                        <i className="bi bi-x me-1"></i> {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12">
              <div className="card p-4 border-0 shadow-sm rounded-4 bg-light">
                <h5 className="fw-bold mb-3 text-dark">
                  <i className="bi bi-lightbulb-fill me-2 text-warning"></i> Personalized Suggestions
                </h5>
                <hr className="mt-0 mb-3 opacity-10" />
                <ul className="list-group list-group-flush bg-transparent">
                  {resume.suggestions.map((suggestion, index) => (
                    <li key={index} className="list-group-item bg-transparent border-0 ps-0">
                      <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i>
                      Gain expertise in <span className="fw-bold">{suggestion}</span> through online courses or projects.
                    </li>
                  ))}
                  {resume.suggestions.length === 0 && (
                    <li className="list-group-item bg-transparent border-0 ps-0 text-success fw-bold">
                      <i className="bi bi-stars text-warning me-2"></i> You are highly ready for this role! Keep up the good work.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
