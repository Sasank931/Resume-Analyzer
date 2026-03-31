import React, { useState } from 'react';
import { analyzerService } from '../services/api';

const Home = () => {
  const [jobRole, setJobRole] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobRole) {
      setError('Please provide both job role and file.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    try {
      const data = await analyzerService.analyze(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const jobRoles = [
    "Software Developer",
    "Data Scientist",
    "Web Developer",
    "Java Developer",
    "Python Developer",
    "Machine Learning Engineer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "Cybersecurity Analyst"
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-5 fw-bold text-primary mb-3">Skill Analysis & Interview Readiness</h1>
          <p className="lead text-muted">Upload your resume to get instant feedback on your technical skills and readiness for your desired job role.</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {!result ? (
            <div className="card p-4 p-lg-5 mb-5 shadow-lg border-0 rounded-4 animate-fade-in">
              <h3 className="text-center mb-4 fw-bold text-dark">Select Role & Upload</h3>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="jobRole" className="form-label fw-bold text-muted small text-uppercase">
                    <i className="bi bi-briefcase-fill me-2 text-primary"></i> Target Job Role
                  </label>
                  <select 
                    className="form-select form-select-lg shadow-sm border-0 bg-light rounded-3" 
                    id="jobRole" 
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>Choose a role...</option>
                    {jobRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-muted small text-uppercase">
                    <i className="bi bi-file-earmark-pdf-fill me-2 text-primary"></i> Upload Resume (PDF)
                  </label>
                  <div 
                    className="upload-area p-4 border-dashed rounded-4 text-center cursor-pointer bg-light" 
                    onClick={() => document.getElementById('file').click()}
                    style={{ border: '2px dashed #dee2e6', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    <i className="bi bi-cloud-arrow-up-fill text-primary display-4"></i>
                    <h5 className="mb-2 text-dark">{file ? file.name : "Click to Browse"}</h5>
                    <p className="text-muted small mb-0">Supports PDF files only (up to 2MB)</p>
                    <input 
                      type="file" 
                      id="file" 
                      className="d-none" 
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3 py-3 fw-bold" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cpu-fill me-2"></i> Analyze My Resume
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="result-section animate-fade-in">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
                <div className="bg-primary p-4 text-white text-center">
                  <h4 className="mb-0 fw-bold">Analysis Results</h4>
                  <p className="mb-0 opacity-75">{jobRole}</p>
                </div>
                
                <div className="card-body p-4 p-lg-5">
                  <div className="text-center mb-5">
                    <h5 className="text-muted text-uppercase small fw-bold mb-3">Overall Readiness Score</h5>
                    <div className="progress mb-3" style={{ height: '25px', borderRadius: '50px' }}>
                      <div 
                        className={`progress-bar progress-bar-striped progress-bar-animated ${result.score > 70 ? 'bg-success' : result.score > 40 ? 'bg-warning' : 'bg-danger'}`}
                        role="progressbar" 
                        style={{ width: `${result.score}%` }} 
                        aria-valuenow={result.score} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {result.score}%
                      </div>
                    </div>
                    <h3 className={`fw-bold ${result.score > 70 ? 'text-success' : result.score > 40 ? 'text-warning' : 'text-danger'}`}>
                      {result.readiness}
                    </h3>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-4 bg-light rounded-4 h-100">
                        <h6 className="fw-bold text-success mb-3">
                          <i className="bi bi-check-circle-fill me-2"></i> Matched Skills
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          {result.matchedSkills.length > 0 ? (
                            result.matchedSkills.map(skill => (
                              <span key={skill} className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted small italic">No matching skills found</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-4 bg-light rounded-4 h-100">
                        <h6 className="fw-bold text-danger mb-3">
                          <i className="bi bi-exclamation-circle-fill me-2"></i> Missing Skills
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          {result.missingSkills.length > 0 ? (
                            result.missingSkills.map(skill => (
                              <span key={skill} className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-success small italic">No missing skills!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="bi bi-lightbulb-fill me-2"></i> Personalized Suggestions
                    </h6>
                    <ul className="list-group list-group-flush bg-transparent">
                      {result.suggestions.length > 0 ? (
                        result.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="list-group-item bg-transparent border-0 px-0 py-2 d-flex align-items-start">
                            <i className="bi bi-arrow-right-short text-primary fs-5 me-1"></i>
                            <span>Focus on learning <strong>{suggestion}</strong> to improve your score for this role.</span>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item bg-transparent border-0 px-0 py-2 text-success fw-bold">
                          You're fully prepared for this role! Great job.
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="text-center mt-5">
                    <button 
                      className="btn btn-outline-primary btn-lg rounded-pill px-5"
                      onClick={() => setResult(null)}
                    >
                      Analyze Another Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
