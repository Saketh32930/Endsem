import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProviderDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch all complaints on load
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/complaints/all");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  // Display complaint details
  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  // Update the status of a complaint to "In Progress"
  const handleUpdateStatus = async () => {
    if (selectedComplaint) {
      try {
        // Update the complaint status in the backend
        const updatedComplaint = { ...selectedComplaint, status: "In Progress" };

        const response = await axios.put(
          `http://localhost:8080/api/complaints/${selectedComplaint.id}`,
          updatedComplaint
        );

        // Update the local state with the updated complaint
        const updatedComplaints = complaints.map((complaint) =>
          complaint.id === selectedComplaint.id ? response.data : complaint
        );
        setComplaints(updatedComplaints);
        setSelectedComplaint(response.data);

        alert("Complaint status updated to 'In Progress'. Team dispatched!");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Service Provider Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* List of complaints */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Complaints</h2>
            {complaints.length === 0 ? (
              <p className="text-gray-600">No complaints available.</p>
            ) : (
              <ul className="space-y-6">
                {complaints.map((complaint) => (
                  <li
                    key={complaint.id}
                    className="border border-gray-300 p-5 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => handleComplaintClick(complaint)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold text-lg">{complaint.category}</span>
                      <span
                        className={`text-sm font-medium ${
                          complaint.status === "Resolved" ? "text-green-500" : "text-yellow-500"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{complaint.description.substring(0, 50)}...</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Complaint details */}
          {selectedComplaint && (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complaint Details</h2>
              <div className="space-y-4">
                <p><strong>Category:</strong> {selectedComplaint.category}</p>
                <p><strong>Description:</strong> {selectedComplaint.description}</p>
                <p><strong>Urgency:</strong> {selectedComplaint.urgency}</p>
                <p><strong>Location:</strong> {selectedComplaint.location}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      selectedComplaint.status === "Resolved"
                        ? "text-green-500"
                        : selectedComplaint.status === "In Progress"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {selectedComplaint.status}
                  </span>
                </p>
                {selectedComplaint.resolutionDetails && (
                  <p><strong>Resolution Details:</strong> {selectedComplaint.resolutionDetails}</p>
                )}
                {selectedComplaint.attachmentBase64 && (
                  <div className="mt-6 flex justify-center">
                    <img
                      src={`data:image/jpeg;base64,${selectedComplaint.attachmentBase64}`}
                      alt="Complaint Attachment"
                      className="w-full md:w-3/4 lg:w-1/2 h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
                {selectedComplaint.status !== "Resolved" && (
                  <button
                    onClick={handleUpdateStatus}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                  >
                    Mark as In Progress & Dispatch Team
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
