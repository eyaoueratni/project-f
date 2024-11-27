import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/AxiosInstance';

const LeaveRequestsList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  // Fetch leave requests for the authenticated user
  const fetchLeaveRequests = async () => {
    try {
      const response = await axiosInstance.get('/api/leave_requests/all-leave-requests/');
      setLeaveRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leave requests. Please check your connection and try again.');
      console.error("Error fetching leave requests:", err);
    }
  };

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

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Leave Requests</h2>
      {error && <p className="text-red-500">{error}</p>}

      {leaveRequests.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">End Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.id} className="border-b">
                <td className="px-4 py-2">{leave.employee_name}</td>
                <td className="px-4 py-2">{leave.start_date}</td>
                <td className="px-4 py-2">{leave.end_date}</td>
                <td className="px-4 py-2">{leave.status}</td>
                <td className="px-4 py-2">{leave.reason}</td>
                <td className="px-4 py-2">
              

{leave.status === 'Pending' ? (
  <div>
    <button
      onClick={() => updateLeaveRequestStatus(leave.id, 'approved')}
      className="bg-green-500 text-white py-1 px-3 rounded mr-2"
    >
      Approve
    </button>
    <button
      onClick={() => updateLeaveRequestStatus(leave.id, 'rejected')}
      className="bg-red-500 text-white py-1 px-3 rounded"
    >
      Reject
    </button>
  </div>
) : (
  <span className={`px-4 py-2 ${leave.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
    {leave.status}
  </span>
)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequestsList;

