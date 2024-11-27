import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/AxiosInstance';

const TimeSheetList = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [error, setError] = useState(null);

  // Fetch timesheets for all users
  const fetchTimeSheets = async () => {
    try {
      const response = await axiosInstance.get('/api/timesheets/all-timesheets/');
      setTimeSheets(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch timesheets. Please check your connection and try again.');
      console.error("Error fetching timesheets:", err);
    }
  };

  // Function to handle status update
  const updateTimeSheetStatus = async (timeSheetId, newStatus) => {
    console.log('Sending data:', { status: newStatus });
    try {
      const response = await axiosInstance.patch(
        `/api/timesheets/${timeSheetId}/update-status/`,
        { status: newStatus }
      );
      // Update the status in the local state after successful update
      setTimeSheets(timeSheets.map((timeSheet) =>
        timeSheet.id === timeSheetId
          ? { ...timeSheet, status: newStatus }
          : timeSheet
      ));

      alert("Timesheet status updated successfully.");
    } catch (err) {
      setError('Failed to update timesheet status.');
      console.error("Error updating timesheet status:", err.response ? err.response.data : err);
    }
  };

  // Fetch timesheets on component mount
  useEffect(() => {
    fetchTimeSheets();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Horaire de travail</h2>
      {error && <p className="text-red-500">{error}</p>}

      {timeSheets.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Hours Worked</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSheets.map((timeSheet) => (
              <tr key={timeSheet.id} className="border-b">
                <td className="px-4 py-2">{timeSheet.employee_name}</td>
                <td className="px-4 py-2">{timeSheet.date}</td>
                <td className="px-4 py-2">{timeSheet.hours_worked}</td>
                <td className="px-4 py-2">{timeSheet.status}</td>
                <td className="px-4 py-2">
                  {/* Add buttons to approve or reject the timesheet */}
                  {timeSheet.status === 'Pending' && (
                    <div>
                      <button
                        onClick={() => updateTimeSheetStatus(timeSheet.id, 'Accepted')}  // Change 'approved' to 'Accepted'
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateTimeSheetStatus(timeSheet.id, 'Rejected')}  // Change 'rejected' to 'Rejected'
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No timesheets found.</p>
      )}
    </div>
  );
};

export default TimeSheetList;


/*
// Function to handle status update
  const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
    try {
      const response = await axiosInstance.patch(`/api/leave_requests/${leaveRequestId}/update-status/`, {
        status: newStatus,
      });
      // Update the status in the local state after successful update
      setLeaveRequests(leaveRequests.map((leaveRequest) =>
        leaveRequest.id === leaveRequestId
          ? { ...leaveRequest, status: newStatus }
          : leaveRequest
      ));
      alert("Leave request status updated successfully.");
    } catch (err) {
      setError('Failed to update leave request status.');
      console.error("Error updating leave request status:", err);
    }
  };
*/