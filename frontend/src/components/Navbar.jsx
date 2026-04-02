import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3 border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-3 p-2 me-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-file-earmark-person-fill fs-5"></i>
          </div>
          <span className="fw-bold text-dark fs-4">Smart Resume Analyzer</span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center">
            <li className="nav-item px-2">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#features">Features</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
          
          <div className="ms-lg-3 d-flex align-items-center">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">
              App Version v1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
