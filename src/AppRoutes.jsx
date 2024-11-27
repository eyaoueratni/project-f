// src/AppRoutes.js
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import DemandeConge from './pages/Conge/DemandeConge';
import ListeConge from './pages/Conge/ListeConge';
import MyListeConge from './pages/Conge/MyListeConge';
import TimeSheetsTable from './pages/Conge/TimeSheet';
import TimeSheetList from './pages/Conge/TimeSheetList';
import ECommerce from './pages/Dashboard/ECommerce';
import AddEmploye from './pages/Employes/AddEmploye';
import EditEmployee from './pages/Employes/EditEmploye';
import ListeEmployes from './pages/Employes/listeEmployes';
import Profile from './pages/Profile';
import AddOffre from './pages/offre/addOffre';
import ListeOffre from './pages/offre/ListeOffre';
import Index from './pages/Acceuil';
import AcceuilCandidat from './pages/CandidatSpace/AcceuilCandidat';

import CandidatureSpace from './pages/CandidatSpace/candidature';
import CandidatureParOffre from './pages/Offre/CandidatureOffre'; 
import MyCandidature from './pages/CandidatSpace/MyCandidature'; 

const AppRoutes = () => (
  <Routes>
    {/* Redirection par défaut vers la page de connexion */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Routes de connexion */}
    <Route path="/login" element={<SignIn />} />
    <Route path="/register" element={<SignUp />} />
    <Route path="/index" element={<Index />} />
    <Route path="/acceuilCandidat" element={<AcceuilCandidat />} />
    <Route path="/offres-emploi/:id" element={<CandidatureSpace />} />
    <Route path="/mesCandidatures" element={<MyCandidature />} />

  
     {/* Autres routes */}
     <Route
      path="/dashboard"
      element={
        
           <>
          <PageTitle title=" APP - Employee" />
          <ECommerce />
        </>
                
      }
    />
    <Route path="/timeSheet" element={<TimeSheetsTable />} />
    
    <Route path="/addEmploye" element={<AddEmploye />} />
    <Route path="/listeEmployes" element={<ListeEmployes />} />
    <Route path="/edit-employee/:employeeId" element={<EditEmployee />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/demandeConge" element={<DemandeConge />} />
    <Route path="/MylistConge" element={<MyListeConge />} />
    <Route path="/listConge" element={<ListeConge />} />
    <Route path="/listTimesheet" element={<TimeSheetList />} />
    {/* *********** */}
    <Route path="/addOffre" element={<AddOffre />} />
    <Route path="/lstOffre" element={<ListeOffre />} />
    <Route path="/candidatures-par-offre/:id" element={<CandidatureParOffre />} />
    
  </Routes>
);

export default AppRoutes;
