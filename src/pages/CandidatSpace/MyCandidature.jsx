import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Si vous avez un fichier CSS personnalisé
import Navbar from './Navbar';
import axios from 'axios'; // Utilisation de Axios pour faire les requêtes API

function MyCandidature() {
  const [candidatures, setCandidatures] = useState([]); // Pour stocker les candidatures
  const [loading, setLoading] = useState(true); // Pour gérer le chargement
  const [error, setError] = useState(null); // Pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les candidatures de l'utilisateur connecté
    const fetchCandidatures = async () => {
      try {
        const token = localStorage.getItem('token'); // Assurez-vous d'avoir un token JWT
        const response = await axios.get('/api/candidatures/moi/', {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête pour l'authentification
          },
        });
        setCandidatures(response.data); // Stocker les candidatures dans l'état
      } catch (err) {
        setError('Erreur lors de la récupération des candidatures.');
      } finally {
        setLoading(false); // Arrêter le chargement une fois que la requête est terminée
      }
    };

    fetchCandidatures();
  }, []);

  return (
    <div className="index">
      <Navbar />
      <div className="my-5"></div>

      <div className="container">
        <h3>Liste de vos candidatures</h3>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : candidatures.length === 0 ? (
          <p>Aucune candidature trouvée.</p>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Offre</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">CV</th>
                  <th scope="col">Date de Postulation</th>
                </tr>
              </thead>
              <tbody>
                {candidatures.map((candidature) => (
                  <tr key={candidature.id}>
                    <td>{candidature.offre.titre}</td>
                    <td>{candidature.telephone}</td>
                    <td>
                      <a href={candidature.cv} target="_blank" rel="noopener noreferrer">
                        Voir le CV
                      </a>
                    </td>
                    <td>{new Date(candidature.date_postulation).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCandidature;
