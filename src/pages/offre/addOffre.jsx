import React, { useState } from 'react';
import AxiosInstance from './AxiosInstance'; 

const AddOffre = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date_expiration: '',
    entreprise: '',
    salaire: '',
    localisation: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on each submission

    try {
      const response = await AxiosInstance.post('/api/offres-emploi/', formData);
      alert('Votre offre a été ajoutée avec succès !'); // Affiche une alerte
      console.log('Server response:', response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur est survenue lors de l'ajout de l'offre.");
    }
  };

  return (
    <div className="mx-auto max-w-full p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            <strong>Ajouter une Offre</strong>
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Titre */}
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="titre"
              placeholder="Titre de l'offre"
              onChange={handleChange}
              value={formData.titre}
              required
            />

            {/* Description */}
            <textarea
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              name="description"
              placeholder="Description de l'offre"
              onChange={handleChange}
              value={formData.description}
              required
            />

            {/* Date d'expiration */}
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="date"
              name="date_expiration"
              onChange={handleChange}
              value={formData.date_expiration}
              required
            />

            {/* Entreprise */}
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="entreprise"
              placeholder="Nom de l'entreprise"
              onChange={handleChange}
              value={formData.entreprise}
              required
            />

            {/* Salaire */}
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="number"
              name="salaire"
              placeholder="Salaire proposé"
              onChange={handleChange}
              value={formData.salaire}
              required
            />

            {/* Localisation */}
            <input
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="localisation"
              placeholder="Localisation"
              onChange={handleChange}
              value={formData.localisation}
              required
            />

            {/* Messages */}
            <div className="col-span-2">
              {error && <p className="text-red-500">{error}</p>}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
              >
                Ajouter l'Offre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOffre;
