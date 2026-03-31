import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/api';

const Home = () => {
  const [jobRole, setJobRole] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    try {
      const data = await resumeService.upload(formData);
      navigate(`/result/${data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="card p-4 mb-4 border-0 shadow-sm bg-primary text-white rounded-4">
            <h5 className="fw-bold mb-3"><i className="bi bi-info-circle-fill me-2"></i> How to use:</h5>
            <ol className="mb-0">
              <li>Select your desired <strong>Job Role</strong></li>
              <li>Upload your <strong>Resume</strong> (PDF format)</li>
              <li>Click <strong>Analyze My Resume</strong></li>
            </ol>
          </div>

          <div className="card p-4 p-lg-5 mb-5 shadow-lg border-0 rounded-4">
            <h3 className="text-center mb-4 fw-bold text-dark">Select Role & Upload</h3>
            
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{error}</div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="jobRole" className="form-label fw-bold">
                  <i className="bi bi-briefcase-fill me-2 text-primary"></i> Target Job Role
                </label>
                <select 
                  className="form-select form-select-lg shadow-sm" 
                  id="jobRole" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose a role...</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                </select>
              </div>

              <div 
                className="upload-area mb-4 p-4 border-dashed rounded-4 text-center cursor-pointer" 
                onClick={() => document.getElementById('file').click()}
                style={{ border: '2px dashed #ccc', cursor: 'pointer' }}
              >
                <i className="bi bi-cloud-arrow-up-fill text-primary display-4"></i>
                <h5 className="mb-2">Click to Browse</h5>
                <p className="text-muted small">Supports PDF files only (up to 2MB)</p>
                <input 
                  type="file" 
                  id="file" 
                  accept=".pdf,application/pdf" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                  required 
                />
                {file && <div className="mt-3 text-primary fw-bold">Selected: {file.name}</div>}
              </div>
              
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg shadow-sm" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Analyzing...
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
        </div>
      </div>
    </div>
  );
};

export default Home;
