import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(username, password);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
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
              <i className="bi bi-shield-lock-fill text-primary display-3 mb-3"></i>
              <h2 className="fw-bold text-dark">Welcome Back</h2>
              <p className="text-muted">Login to access your dashboard</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0 rounded-3 mb-4 py-2">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold small text-uppercase text-muted">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="form-control form-control-lg border-0 bg-light rounded-3" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-bold small text-uppercase text-muted">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-control form-control-lg border-0 bg-light rounded-3" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-5 pt-4 border-top text-muted">
              <p className="mb-2">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
