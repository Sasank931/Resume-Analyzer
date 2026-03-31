import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Even if logout fails on server, we can clear local state
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-file-earmark-person-fill me-2 fs-3"></i>
          <span className="fs-4">Smart Resume Analyzer</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="bi bi-house-door me-1"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about"><i className="bi bi-info-circle me-1"></i> About</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item ms-lg-3">
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm px-3 rounded-pill">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item ms-lg-3">
                  <Link className="btn btn-outline-primary btn-sm px-4 rounded-pill" to="/login">
                    <i className="bi bi-person-fill me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
