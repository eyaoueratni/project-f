import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
      <div className="container">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand">
          <h1 className="m-0 text-primary">Coding</h1>
        </NavLink>
        
        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-3">
              <NavLink 
                to="/acceuilCandidat" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary fw-normal'}`
                }
                style={{ fontSize: '15px' }} 
              >
                offres d'emploi
              </NavLink>
            </li>
            <li className="nav-item ms-3">
              <NavLink 
                to="/mesCandidatures" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'text-primary fw-bold' : 'text-secondary fw-normal'}`
                }
                style={{ fontSize: '15px' }} 
              >
                mes candidatures
              </NavLink>
            </li>
            <li className="nav-item ms-3">
              <NavLink to="/login" className="btn btn-primary">
                logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
