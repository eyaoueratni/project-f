
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Si vous avez un fichier CSS personnalisé
import Navbar from './Navbar';
import JobListing from './JobListing';

function AcceuilCandidat() {
  return (
    <div className="index">
      <Navbar />
     
      <div className="my-5"></div>

      {/* Section Job Listing */}
      <JobListing />
    </div>
  );
}

export default AcceuilCandidat