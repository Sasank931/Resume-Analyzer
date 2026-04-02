import React, { useState, useRef } from 'react';
import { analyzerService } from '../services/api';

const Home = () => {
  const [jobRole, setJobRole] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const analyzeSectionRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Invalid file format. Please upload a PDF file.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
      setSuccess('File uploaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'application/pdf') {
        setError('Invalid file format. Please upload a PDF file.');
        return;
      }
      setFile(droppedFile);
      setError('');
      setSuccess('File uploaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobRole) {
      setError('Please select a job role and upload your resume.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    try {
      const data = await analyzerService.analyze(formData);
      setResult(data);
      setSuccess('Analysis completed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Backend not reachable. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToAnalyze = () => {
    analyzeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const features = [
    {
      icon: "bi-cpu-fill",
      title: "Resume Analysis",
      description: "Advanced text extraction and analysis of your professional background.",
      color: "bg-primary-subtle text-primary"
    },
    {
      icon: "bi-layout-text-sidebar-reverse",
      title: "Skill Matching",
      description: "Direct comparison between your skills and industry requirements.",
      color: "bg-success-subtle text-success"
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Career Suggestions",
      description: "Personalized roadmap to help you bridge the gap for your target role.",
      color: "bg-warning-subtle text-warning"
    },
    {
      icon: "bi-patch-check-fill",
      title: "Interview Readiness",
      description: "Quantitative score showing how prepared you are for technical interviews.",
      color: "bg-danger-subtle text-danger"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-4 animate-fade-in">
                AI-Powered Career Tool
              </span>
              <h1 className="display-3 fw-bold mb-4 animate-fade-in" style={{ letterSpacing: '-1px' }}>
                Smart Resume Analyzer
              </h1>
              <p className="lead mb-5 opacity-75 animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Upload your resume and instantly discover missing skills, strengths, and career readiness for top-tier industry roles.
              </p>
              <div className="d-flex justify-content-center gap-3 animate-fade-in">
                <button onClick={scrollToAnalyze} className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold">
                  Analyze Resume
                </button>
                <a href="#features" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5" ref={analyzeSectionRef}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Status Messages */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4 rounded-4 shadow-sm animate-fade-in" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>{error}</div>
              </div>
            )}
            {success && (
              <div className="alert alert-success d-flex align-items-center mb-4 rounded-4 shadow-sm animate-fade-in" role="alert">
                <i className="bi bi-check-circle-fill me-3 fs-4"></i>
                <div>{success}</div>
              </div>
            )}

            {!result ? (
              /* Upload Card */
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate-fade-in">
                <div className="row g-0">
                  <div className="col-md-5 bg-primary p-5 text-white d-flex flex-column justify-content-center">
                    <h2 className="fw-bold mb-4">Ready to level up?</h2>
                    <p className="opacity-75 mb-0">
                      Our system will scan your PDF resume, extract technical keywords, and compare them against our database of required skills for {jobRole || 'your target role'}.
                    </p>
                    <div className="mt-5 d-none d-md-block">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-shield-check me-3 fs-4"></i>
                        <span>Secure PDF processing</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-lightning-charge me-3 fs-4"></i>
                        <span>Instant results</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-graph-up me-3 fs-4"></i>
                        <span>Detailed skill gap analysis</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 p-4 p-lg-5">
                    <h3 className="fw-bold mb-4 text-dark">Analyze Your Resume</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="jobRole" className="form-label fw-bold text-muted small text-uppercase">
                          Select Target Job Role
                        </label>
                        <select 
                          className="form-select form-select-lg border-light bg-light rounded-3 shadow-none" 
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
                          Upload Resume (PDF)
                        </label>
                        <div 
                          className={`upload-area p-5 rounded-4 text-center cursor-pointer ${isDragging ? 'drag-over' : ''}`}
                          onClick={() => fileInputRef.current.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <i className={`bi ${file ? 'bi-file-earmark-check-fill text-success' : 'bi-cloud-arrow-up-fill text-primary'} display-3 mb-3`}></i>
                          <h5 className="mb-2 text-dark">{file ? file.name : "Drag and drop or Click to Browse"}</h5>
                          <p className="text-muted small mb-0">Only PDF files are supported</p>
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            className="d-none" 
                            accept=".pdf"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="d-grid mt-5">
                        <button type="submit" className="btn btn-primary btn-lg rounded-pill py-3 fw-bold shadow-sm" disabled={loading}>
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Analyzing your resume...
                            </>
                          ) : (
                            <>Analyze Resume</>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Dashboard */
              <div className="result-section animate-fade-in">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
                  <div className="bg-secondary p-4 p-lg-5 text-white">
                    <div className="row align-items-center">
                      <div className="col-md-8 text-center text-md-start">
                        <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">Analysis Result</span>
                        <h2 className="fw-bold mb-1">Your Professional Profile</h2>
                        <p className="mb-0 opacity-75 fs-5">Targeting: <span className="text-white fw-bold">{jobRole}</span></p>
                      </div>
                      <div className="col-md-4 text-center text-md-end mt-4 mt-md-0">
                        <button className="btn btn-outline-light rounded-pill px-4" onClick={() => setResult(null)}>
                          <i className="bi bi-arrow-left me-2"></i> New Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-body p-4 p-lg-5">
                    {/* Score Section */}
                    <div className="row justify-content-center mb-5">
                      <div className="col-lg-8 text-center">
                        <h5 className="text-muted text-uppercase small fw-bold mb-4">Resume Readiness Score</h5>
                        <div className="position-relative mb-4" style={{ height: '12px', background: '#E2E8F0', borderRadius: '10px' }}>
                          <div 
                            className={`position-absolute top-0 start-0 h-100 rounded-pill transition-all`}
                            style={{ 
                              width: `${result.score}%`, 
                              background: result.score >= 80 ? 'var(--accent)' : result.score >= 50 ? 'var(--warning)' : 'var(--danger)',
                              transition: 'width 1s ease-out'
                            }} 
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold fs-4" style={{ color: result.score >= 80 ? 'var(--accent)' : result.score >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                            {result.score}%
                          </span>
                          <span className="fw-bold text-dark fs-5">{result.readiness}</span>
                        </div>
                      </div>
                    </div>

                    <div className="row g-4">
                      {/* Matched Skills */}
                      <div className="col-md-6">
                        <div className="feature-card h-100 border-success-subtle bg-light">
                          <div className="d-flex align-items-center mb-4">
                            <div className="feature-icon bg-success-subtle text-success mb-0 me-3">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <h5 className="fw-bold mb-0">Matched Skills</h5>
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            {result.matchedSkills.length > 0 ? (
                              result.matchedSkills.map(skill => (
                                <span key={skill} className="badge bg-white text-success border border-success-subtle px-3 py-2 rounded-pill shadow-sm">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <p className="text-muted mb-0 italic">No direct skill matches found.</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div className="col-md-6">
                        <div className="feature-card h-100 border-danger-subtle bg-light">
                          <div className="d-flex align-items-center mb-4">
                            <div className="feature-icon bg-danger-subtle text-danger mb-0 me-3">
                              <i className="bi bi-exclamation-circle-fill"></i>
                            </div>
                            <h5 className="fw-bold mb-0">Missing Skills</h5>
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            {result.missingSkills.length > 0 ? (
                              result.missingSkills.map(skill => (
                                <span key={skill} className="badge bg-white text-danger border border-danger-subtle px-3 py-2 rounded-pill shadow-sm">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <p className="text-success mb-0 fw-bold">Perfect match! No missing skills found.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Suggestions Section */}
                    <div className="mt-5 p-4 p-lg-5 rounded-4 bg-primary-subtle border border-primary-subtle">
                      <div className="d-flex align-items-center mb-4">
                        <div className="feature-icon bg-primary text-white mb-0 me-3 shadow-sm">
                          <i className="bi bi-lightbulb-fill"></i>
                        </div>
                        <h5 className="fw-bold text-primary mb-0">Improvement Suggestions</h5>
                      </div>
                      <div className="row">
                        {result.suggestions.length > 0 ? (
                          result.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="col-md-6 mb-3">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-arrow-right-circle text-primary me-2"></i>
                                <span>Master <strong>{suggestion}</strong> to increase your compatibility.</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">
                            <div className="d-flex align-items-center text-success fw-bold">
                              <i className="bi bi-stars me-2"></i>
                              <span>Your profile is perfectly aligned with this role!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Key Features</h2>
            <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
              Our analyzer uses intelligent pattern matching to provide actionable insights for your career growth.
            </p>
          </div>
          <div className="row g-4">
            {features.map((feature, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="feature-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className={`feature-icon ${feature.color}`}>
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0 small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <span className="text-primary fw-bold text-uppercase small tracking-wider mb-2 d-block">Project Overview</span>
                <h2 className="display-5 fw-bold mb-4">Empowering the next generation of developers</h2>
                <p className="lead text-muted mb-4">
                  This project analyzes resumes using skill matching techniques to help students identify missing skills and improve employability.
                </p>
                <p className="text-muted mb-4">
                  Built as a final year mini project, the Smart Resume Analyzer aims to bridge the gap between academic learning and industry expectations by providing real-time feedback on professional documents.
                </p>
                <div className="d-flex align-items-center gap-4 mt-5">
                  <div className="text-center">
                    <h4 className="fw-bold mb-0">10+</h4>
                    <span className="text-muted small">Job Roles</span>
                  </div>
                  <div className="vr h-100 opacity-25"></div>
                  <div className="text-center">
                    <h4 className="fw-bold mb-0">50+</h4>
                    <span className="text-muted small">Tech Skills</span>
                  </div>
                  <div className="vr h-100 opacity-25"></div>
                  <div className="text-center">
                    <h4 className="fw-bold mb-0">100%</h4>
                    <span className="text-muted small">Accuracy</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white p-4 rounded-4 shadow-lg position-relative overflow-hidden">
                <div className="position-absolute top-0 end-0 p-3 opacity-10">
                  <i className="bi bi-quote display-1"></i>
                </div>
                <h5 className="fw-bold mb-4">Our Technology Stack</h5>
                <div className="list-group list-group-flush">
                  <div className="list-group-item bg-transparent border-light px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3">
                        <i className="bi bi-filetype-java"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Java & Spring Boot</h6>
                        <p className="small text-muted mb-0">Robust backend for PDF processing and skill analysis.</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item bg-transparent border-light px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-success-subtle text-success p-2 rounded-3 me-3">
                        <i className="bi bi-braces"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">React & Vite</h6>
                        <p className="small text-muted mb-0">Fast, responsive frontend with modern UI components.</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item bg-transparent border-0 px-0 py-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning-subtle text-warning p-2 rounded-3 me-3">
                        <i className="bi bi-cloud-check"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">Railway & Vercel</h6>
                        <p className="small text-muted mb-0">Scalable cloud hosting for seamless deployment.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
