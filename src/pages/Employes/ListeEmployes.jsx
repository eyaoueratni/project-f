import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import AxiosInstance from '../../service/AxiosInstance';

const ListeEmployes = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    AxiosInstance.get('/api/employes/')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleEdit = (employeeId) => {
    // Redirect to the edit page with the employee ID
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const url = `/employes/${employeeId}/delete/`;

      AxiosInstance.delete(url)
        .then(() => {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((emp) => emp.id !== employeeId)
          );
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  return (
    <div className="mx-auto max-w-8xl p-5"> {/* Conteneur principal */}
    <div className="grid grid-cols-5 gap-12">
      <div className="col-span-5 xl:col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-blue-500 dark:text-blue-400 text-center">
              <strong>Liste des Employés</strong>
            </h3>
          </div>
          <div className="p-7">
            <div className="max-w-full overflow-x-auto table-wrapper">
              <table className="w-full table-auto border-collapse border border-stroke dark:border-strokedark">
                <thead>
                  <tr className="bg-gray-100 dark:bg-meta-4">
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Image</th>
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Nom</th>
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Position</th>
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Département</th>
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Téléphone</th>
                    <th className="border border-stroke py-2 px-4 text-left dark:border-strokedark">Email</th>
                    <th className="border border-stroke py-2 px-4 text-center dark:border-strokedark">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-200 dark:hover:bg-meta-3">
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">
                        <img
                          src={employee.user.profile_picture ? `http://localhost:8000${employee.user.profile_picture}` : 'default_profile_picture.jpg'}
                          alt={`${employee.user.username}'s profile`}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{employee.user.username}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{employee.position}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{employee.department}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{employee.tel || 'N/A'}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark">{employee.user.email}</td>
                      <td className="border border-stroke py-2 px-4 dark:border-strokedark flex justify-center gap-0.5">
                        {/* Bouton Edit */}
                        <button
                          onClick={() => handleEdit(employee.id)}
                          className="text-blue-500 hover:text-blue-700 p-1 rounded-full transition duration-200 ease-in-out"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 3l4 4-11 11H3v-4L14 3z" />
                          </svg>
                        </button>
  
                        {/* Bouton Delete */}
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full transition duration-200 ease-in-out"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  
  );
};

export default ListeEmployes;

