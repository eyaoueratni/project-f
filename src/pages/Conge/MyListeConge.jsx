import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/AxiosInstance';

const LeaveRequestsList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch leave requests for the authenticated user
  const fetchLeaveRequests = async () => {
    try {
      const response = await axiosInstance.get('/api/leave_requests/my-leave-requests/');
      setLeaveRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leave requests. Please check your connection and try again.');
      console.error("Error fetching leave requests:", err);
    }
  };

  const handleCancel = async (leaveId) => {
    // Check if the leave request status is pending before proceeding
    const leave = leaveRequests.find(request => request.id === leaveId);
    if (leave && leave.status === 'Pending') {
      try {
        // Assuming you need to use DELETE method to cancel
        const response = await axiosInstance.delete(`/api/leave_requests/${leaveId}/delete-leave-request/`);
        setLeaveRequests(leaveRequests.filter(request => request.id !== leaveId)); // Remove from state
        setError(null);
      } catch (err) {
        setError('Failed to delete leave request. Please check your connection and try again.');
        console.error("Error deleting leave request:", err);
      }
    } else {
      setError('You cannot cancel a leave request once it has been confirmed by HR.');
    }
  };

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Leave Requests</h2>
      {error && <p className="text-red-500">{error}</p>}

      {leaveRequests.length > 0 ? (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    start date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    end date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    status
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr key={leave.id} className="mb-2 p-2 border-b">
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {leave.start_date}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {leave.end_date}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {leave.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        {leave.status === 'Pending' && (
                          <button onClick={() => handleCancel(leave.id)} className="hover:text-primary">
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                fill=""
                              />
                              <path
                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequestsList;
