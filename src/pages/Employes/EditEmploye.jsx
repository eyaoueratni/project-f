import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../../service/AxiosInstance';

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    position: '',
    department: '',
    profile_picture: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    AxiosInstance.get(`/api/employes/${employeeId}/`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
      });
  }, [employeeId]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profile_picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in employee) {
      formData.append(key, employee[key]);
    }

    AxiosInstance.put(`/employes/${employeeId}/edit/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        setSuccess("Employee updated successfully.");
        navigate('/liste-employes');
      })
      .catch((error) => {
        setError('Error updating employee.');
        console.error('Error updating employee:', error);
      });
  };

  return (
    <div className="mx-auto max-w-full p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white text-center">
            <strong>Editer un employé</strong>
          </h3>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom complet et Email */}
              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  value={employee.username}
                />
              </div>

              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={employee.email}
                  onChange={handleChange}
                />
              </div>

              {/* Département et Position */}
              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={employee.department}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={employee.position}
                  onChange={handleChange}
                />
              </div>

              {/* Mot de passe et confirmation */}
              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={employee.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-5.5">
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="password"
                  name="password2"
                  placeholder="Re-enter Password"
                  value={employee.password2}
                  onChange={handleChange}
                />
              </div>

              {/* Photo de profil */}
              <div className="mb-5.5 col-span-2">
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
                  className="inline-flex items-center justify-center rounded bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
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

export default EditEmployee;
