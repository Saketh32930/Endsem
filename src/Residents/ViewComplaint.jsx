import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const username = localStorage.getItem("username");

        const response = await axios.get(
          `http://localhost:8080/api/complaints?username=${username}`
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 animate-pulse">Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8 text-indigo-700">
          My Complaints
        </h2>
        {complaints.length === 0 ? (
          <p className="text-center text-gray-700 font-semibold">
            No complaints have been posted yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Category</th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Description</th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Urgency</th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Location</th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Status</th>
                  <th className="border border-gray-300 px-6 py-3 text-left text-lg font-medium">Image</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {complaints.map((complaint, index) => (
                  <tr
                    key={complaint.id}
                    className={`hover:bg-gray-50 transition duration-300 ease-in-out ${
                      index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-300 px-6 py-4 text-lg">{complaint.category}</td>
                    <td className="border border-gray-300 px-6 py-4 text-lg">
                      {complaint.description.length > 50
                        ? `${complaint.description.substring(0, 50)}...`
                        : complaint.description}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-lg">{complaint.urgency}</td>
                    <td className="border border-gray-300 px-6 py-4 text-lg">{complaint.location}</td>
                    <td
                      className={`border border-gray-300 px-6 py-4 font-semibold text-lg ${
                        complaint.status === "Pending"
                          ? "text-yellow-600"
                          : complaint.status === "Approved"
                          ? "text-green-600"
                          : complaint.status === "InProgress"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {complaint.status}
                      {complaint.status === "InProgress" && (
                        <p className="text-sm text-blue-600 mt-2">
                          The complaint has been viewed by the service provider and they sent the appropriate team to resolve the problem.
                        </p>
                      )}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      {complaint.attachmentBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${complaint.attachmentBase64}`}
                          alt="Complaint attachment"
                          className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75"
                          onClick={() => handleImageClick(complaint.attachmentBase64)}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Image Display */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl text-center mb-4 text-indigo-700">Complaint Image</h3>
            <img
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Full complaint attachment"
              className="w-full h-auto max-w-3xl object-contain mx-auto"
            />
            <div className="mt-4 text-center">
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewComplaint;
