import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Candidature = () => {
  const { id } = useParams(); // Récupère l'ID de l'offre depuis l'URL
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    telephone: "",
    cv: null,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch les détails de l'offre
    const fetchOfferDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/offres-emploi/${id}`);
        if (!response.ok) throw new Error("Erreur lors du chargement de l'offre.");
        const data = await response.json();
        setOffer(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, cv: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("telephone", form.telephone);
    formData.append("cv", form.cv);
    formData.append("offre", id);

    try {
      const response = await fetch("http://localhost:8000/api/postuler/", {
        method: "POST",
        headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT Token si nécessaire
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Votre candidature a été envoyée avec succès !");
        setForm({ telephone: "", cv: null }); // Réinitialiser le formulaire
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData?.error || "Erreur lors de l'envoi de la candidature."
        );
      }
    } catch (error) {
      setErrorMessage("Erreur réseau. Veuillez réessayer plus tard.");
      console.error("Erreur :", error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Chargement...</div>;
  }

  if (!offer) {
    return <div className="text-center text-red-500 mt-10">Offre introuvable.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-5 flex flex-col md:flex-row gap-10">
        {/* Détails de l'offre */}
        <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{offer.titre}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Localisation : </span>
            {offer.localisation}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Type d'emploi : </span>
            {offer.type_emploi}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Salaire : </span>
            {offer.salaire}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Description : </span>
            {offer.description}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-700">Date limite : </span>
            {new Date(offer.date_expiration).toLocaleDateString()}
          </p>
        </div>

        {/* Formulaire de candidature */}
        <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Postuler à cette offre</h2>
          {successMessage && (
            <p className="text-green-600 bg-green-100 p-3 rounded mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 bg-red-100 p-3 rounded mb-4">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-gray-700 font-medium">
                Téléphone :
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={form.telephone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cv" className="block text-gray-700 font-medium">
                CV (PDF) :
              </label>
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Postuler
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Candidature;
