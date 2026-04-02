import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-4">Smart Resume Analyzer</h5>
            <p className="text-muted-white opacity-75 mb-4">
              Empowering students and job seekers with AI-driven resume insights to bridge the skill gap and improve employability.
            </p>
            <p className="small mb-0">Developed as a B.Tech Mini Project</p>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-4 text-uppercase small">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Home</a></li>
              <li className="mb-2"><a href="#about" className="text-white text-decoration-none opacity-75 hover-opacity-100">About</a></li>
              <li className="mb-2"><a href="#features" className="text-white text-decoration-none opacity-75 hover-opacity-100">Features</a></li>
              <li className="mb-2"><a href="#contact" className="text-white text-decoration-none opacity-75 hover-opacity-100">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-4 text-uppercase small">Technologies Used</h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-light text-dark px-3 py-2">Java</span>
              <span className="badge bg-light text-dark px-3 py-2">Spring Boot</span>
              <span className="badge bg-light text-dark px-3 py-2">React</span>
              <span className="badge bg-light text-dark px-3 py-2">REST API</span>
              <span className="badge bg-light text-dark px-3 py-2">Vercel</span>
              <span className="badge bg-light text-dark px-3 py-2">Railway</span>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-4 text-uppercase small">Year</h6>
            <p className="fs-5 fw-bold mb-0">2026</p>
          </div>
        </div>
        
        <hr className="my-4 opacity-25" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0 opacity-75">&copy; 2026 Smart Resume Analyzer. All rights reserved.</p>
          </div>
          <div id="contact" className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-white opacity-75 fs-5"><i className="bi bi-github"></i></a>
              <a href="#" className="text-white opacity-75 fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white opacity-75 fs-5"><i className="bi bi-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
