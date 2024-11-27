
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../service/AxiosInstance';

const SubmitLeaveRequest = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [remainingDays, setRemainingDays] = useState(null); // State to store remaining leave days

    useEffect(() => {
        // Fetch remaining leave days when component loads
        const fetchRemainingDays = async () => {
            try {
                const response = await AxiosInstance.get('/api/leave_balance/');
                if (response.data && response.data.length > 0) {
                    setRemainingDays(response.data[0].remaining_days);
                } else {
                    setRemainingDays(0);
                }
            } catch (error) {
                console.error("Error fetching remaining leave days:", error);
            }
        };

        fetchRemainingDays();
    }, []);

    const handleSubmit = async () => {
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
    
        try {
            const response = await AxiosInstance.post('/api/leave_requests/', {
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                reason,
            });
            setMessage("Demande de congé envoyée avec succès !");
        } catch (error) {
            if (error.response) {
                console.error("Server response error:", error.response.data);
                setMessage(`Échec de la demande de congé: ${error.response.data.detail || 'Erreur inconnue.'}`);
            } else {
                console.error("Erreur lors de la demande de congé:", error);
                setMessage("Échec de la demande de congé.");
            }
        }
    };
    
    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Demande de congé
                        </h3>
                        {/* Display remaining leave days */}
                        {remainingDays !== null && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Jours restants: {remainingDays}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">Date début</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">Date fin</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">Type de congé</label>
                            <input
                                type="text"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Motif du congé"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <button
                            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            onClick={handleSubmit}
                        >
                            Envoyer la demande
                        </button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitLeaveRequest;

/*
  <div>
            <h2>Demande de congé</h2>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motif du congé"></textarea>
            <button onClick={handleSubmit}>Envoyer la demande</button>
            {message && <p>{message}</p>}
        </div>
*/