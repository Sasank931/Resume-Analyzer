import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Result from './pages/Result';
import About from './pages/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // In a simple session-based app, the browser handles cookies automatically.
    // We can assume we're not authenticated on first load until we try to log in.
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-shrink-0 mb-5">
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/result/:id" 
              element={isAuthenticated ? <Result /> : <Navigate to="/login" />} 
            />
            <Route path="/about" element={<About />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
