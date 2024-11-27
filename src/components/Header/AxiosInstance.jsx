import axios from 'axios';

// Créer une instance Axios
const AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Remplace par l'URL de ton API
  headers: {
    'Content-Type': 'application/json', // Définit le type de contenu comme JSON
  },
});

// Ajouter un intercepteur pour ajouter le token d'accès dans les en-têtes de chaque requête
AxiosInstance.interceptors.request.use(
  (config) => {
    // Récupérer le token d'accès du localStorage
    const accessToken = localStorage.getItem('authToken');

    // Si le token d'accès est présent, l'ajouter dans les en-têtes
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config; // Retourne la configuration modifiée
  },
  (error) => {
    // En cas d'erreur, la promesse est rejetée
    return Promise.reject(error);
  }
);

// Ajouter un intercepteur pour gérer les erreurs globalement
AxiosInstance.interceptors.response.use(
  (response) => {
    // Si la requête réussit, on renvoie la réponse
    return response;
  },
  (error) => {
    // Si une erreur survient, on gère l'erreur ici
    if (error.response) {
      console.error('Erreur de réponse:', error.response);
    } else if (error.request) {
      console.error('Aucune réponse reçue:', error.request);
    } else {
      console.error('Erreur dans la configuration:', error.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
