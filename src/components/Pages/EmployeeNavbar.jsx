
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import LogoutButton from './LogoutButton';

const EmployeeNavbar = ({ employee, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="fas fa-briefcase text-blue-600 text-2xl mr-2"></i>
              <span className="font-bold text-xl text-gray-800">WorkPortal</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Schedule
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Tasks
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Documents
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${employee?.name || 'User'}`}
                    alt="User profile"
                  />
                  <span className="ml-2 hidden md:block text-gray-700 text-sm font-medium">
                    {employee?.name || 'Employee'}
                  </span>
                  <i className="fas fa-chevron-down ml-1 text-gray-400 text-xs"></i>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-800 font-medium">{employee?.name || 'Employee'}</p>
                    <p className="text-xs text-gray-500 truncate">{employee?.email || 'employee@company.com'}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-user-circle mr-2 text-gray-500"></i>Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i className="fas fa-cog mr-2 text-gray-500"></i>Settings
                  </a>
                  <div className="border-t border-gray-100"></div>
                 <LogoutButton/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};



export default EmployeeNavbar
