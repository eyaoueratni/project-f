import React, { useState } from 'react';
import AxiosInstance from './AxiosInstance'; 

const Employe = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    position: '',
    department: '',
    profile_picture: null,
    tel: '', // Added tel field
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if passwords match
    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare FormData
    const signupData = new FormData();
    Object.keys(formData).forEach((key) => {
      signupData.append(key, formData[key]);
    });

    try {
      const response = await AxiosInstance.post('/api/signup/employe/', signupData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess("Registration successful!");
      setError(null);
      console.log("Server response:", response.data);
    } catch (err) {
      console.error("Error details:", err.response ? err.response.data : err);
      const errorMessage = err.response?.data?.detail || "An error occurred during registration.";
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
    <div className="mx-auto max-w-full p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            <strong>Ajouter un employé</strong>
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom complet et Email */}
              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>

              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Département et Position */}
              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>

              {/* Mot de passe et confirmation */}
              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="password"
                  name="password2"
                  placeholder="Re-enter Password"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </div>

             

              <div className="mb-4 col-span-1">
                <input
                  type="tel"
                  className="w-full rounded border border-stroke bg-gray py-2.5 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  name="tel"
                  placeholder="Phone Number"
                  value={formData.tel}
                  onChange={handleChange}
                />
              </div>
               {/* Photo de profil et téléphone (same row) */}
               <div className="mb-4 col-span-1">
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent"
                  name="profile_picture"
                  onChange={handleFileChange}
                />
              </div>

              {/* Messages d'erreur ou succès */}
              <div className="col-span-2">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
              </div>

              {/* Bouton de soumission */}
              <div className="col-span-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Employe;
