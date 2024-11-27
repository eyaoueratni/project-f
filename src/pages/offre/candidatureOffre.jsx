import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';

const CandidatureOffre = () => {
  const { id } = useParams();
  const [candidatures, setCandidatures] = useState([]);
  const [error, setError] = useState(null);
  const [matchingResults, setMatchingResults] = useState([]);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        // Fetch candidatures
        const response = await AxiosInstance.get(`/api/offre/${id}/candidatures/`);
        setCandidatures(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des candidatures. Veuillez vérifier l'offre ou réessayer plus tard.");
      }
    };

    // Fetch matching results
    const fetchMatchingResults = async () => {
      try {
        const response = await AxiosInstance.get(`/api/matchCandidatures/${id}/`);
        setMatchingResults(response.data.matching_results || []);
      } catch (err) {
        setError("Erreur lors du chargement des résultats de correspondance.");
      }
    };

    fetchCandidatures();
    fetchMatchingResults();
  }, [id]);

  return (
    <div className="mx-auto max-w-full p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-blue-500 dark:text-blue-400 text-center">
            <strong>Candidatures pour l&apos;offre {id}</strong>
          </h3>
        </div>

        <div className="p-7">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {candidatures.length > 0 ? (
            <table className="w-full table-auto border-collapse border border-stroke dark:border-strokedark">
              <thead>
                <tr className="bg-gray-100 dark:bg-meta-4">
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Nom</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Email</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Date d'envoi</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Télécharger CV</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Téléphone</th>
                  <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Score</th>
                </tr>
              </thead>
              <tbody>
                {candidatures.map((candidature) => {
                  // Find matching score for the current candidature
                  const matchingResult = matchingResults.find(
                    (result) => result.candidat === candidature.candidat_name
                  );
                  const similarityScore = matchingResult ? matchingResult.similarity_score : 'Non calculé';

                  return (
                    <tr key={candidature.id} className="hover:bg-gray-200 dark:hover:bg-meta-3">
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{candidature.candidat_name}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{candidature.candidat_email}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{new Date(candidature.date_postulation).toLocaleDateString()}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">
                        <a
                          href={`http://localhost:8000${candidature.cv}`}  // Préfixe du backend
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Télécharger
                        </a>
                      </td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">
                        {candidature.candidat_phone ? candidature.candidat_phone : 'Non renseigné'}
                      </td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">
                        {similarityScore !== 'Non calculé' ? similarityScore.toFixed(2) : similarityScore}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            !error && <p className="text-center text-gray-500">Aucune candidature pour cette offre.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatureOffre;
