import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(username, password, fullName);
      navigate('/login', { state: { success: 'Registration successful! Please login.' } });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="col-md-6 col-lg-4 text-center">
          <div className="card p-5 animate-fade-in border-0 shadow-lg rounded-4">
            <div className="mb-4">
              <i className="bi bi-person-plus-fill text-primary display-3 mb-3"></i>
              <h2 className="fw-bold text-dark">Create Account</h2>
              <p className="text-muted">Join the Smart Resume Analyzer community</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0 rounded-3 mb-4 py-2 text-start">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-bold small text-uppercase text-muted">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="form-control form-control-lg border-0 bg-light rounded-3" 
                  placeholder="Enter your full name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold small text-uppercase text-muted">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="form-control form-control-lg border-0 bg-light rounded-3" 
                  placeholder="Choose a username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-bold small text-uppercase text-muted">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control form-control-lg border-0 bg-light rounded-3" 
                  placeholder="Create a password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i> Register Now
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-4 pt-3 border-top">
              <p className="mb-0 text-muted">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
