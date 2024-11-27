import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import AxiosInstance from './AxiosInstance'; // Assurez-vous que AxiosInstance est bien configuré

const ListeOffre = () => {
  const [offres, setOffres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        const response = await AxiosInstance.get('/api/offres-emploi/');
        setOffres(response.data); // Supposons que la réponse est un tableau d'offres
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des offres.");
      }
    };

    fetchOffres();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR'); // Format MM/DD/YYYY
  };

  return (
    <div className="mx-auto max-w-full p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-blue-500 dark:text-blue-400 text-center">
            <strong>Liste des Offres d'Emploi</strong>
          </h3>
        </div>

        <div className="p-7">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {offres.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-gray-100 dark:bg-meta-4">
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">#</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Titre</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Entreprise</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Localisation</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Date d'Expiration</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Salaire</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Lister des candidatures</th>
                </tr>
              </thead>
              <tbody>
                {offres.map((offre, index) => (
                  <tr key={offre.id} className="hover:bg-gray-200 dark:hover:bg-meta-3">
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{index + 1}</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{offre.titre}</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{offre.entreprise}</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{offre.localisation}</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{formatDate(offre.date_expiration)}</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">{offre.salaire} €</td>
                    <td className="border border-stroke py-2 px-4 dark:border-strokedark">
                      <Link 
                        to={`/candidatures-par-offre/${offre.id}`} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Voir les candidatures
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !error && <p className="text-center text-gray-500">Aucune offre disponible pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeOffre;
