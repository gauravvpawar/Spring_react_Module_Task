import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowPopup(true); // Show confirmation popup
  };

  const confirmLogout = () => {
    setShowPopup(false);
    // Optional: Clear any stored login info
    // localStorage.removeItem('user'); or sessionStorage.clear()
    navigate("/"); // Redirect to home (login) page
  };

  const cancelLogout = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div>
      {/* Logout button */}
      <button
        onClick={handleLogoutClick}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        <i className="fas fa-sign-out-alt mr-2"></i>Sign out
      </button>

      {/* Confirmation popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
