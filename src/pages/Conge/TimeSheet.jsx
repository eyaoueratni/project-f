import React, { useState } from 'react';
import AxiosInstance from '../../service/AxiosInstance';

const TimesheetForm = () => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [comments, setComments] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await AxiosInstance.post('/api/submit-time-sheet/', {
                date,
                start_time: startTime,
                end_time: endTime,
                comments,
            });
            setMessage("Timesheet submitted successfully!");
        } catch (error) {
            console.error("Error submitting timesheet:", error);
            setMessage("Error submitting timesheet. Please try again.");
        }
    };

    return (

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Timesheet
                        </h3>
            
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">Date </label>
                            <input
                                type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white"> start time</label>
                            <input
                               type="time"
                                value={startTime} 
                                onChange={(e) => setStartTime(e.target.value)}
                                 required
                                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">End time</label>
                            <input
                               type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                        </div>
                        <button
                            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            onClick={handleSubmit}
                        >
                          submit time sheet 
                        </button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimesheetForm;
/*
 <div>
            <h2>Submit Timesheet</h2>
            <form onSubmit={handleSubmit}>
                <label>Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <br />
                <label>Start Time:
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <br />
                <label>End Time:
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </label>
                <br />
                <label>Comments:
                    <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Enter any additional comments here" />
                </label>
                <br />
                <button type="submit">Submit Timesheet</button>
            </form>
            {message && <p>{message}</p>}
        </div>
*/