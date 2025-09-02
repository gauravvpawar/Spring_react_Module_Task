import React from "react";
import { useLocation } from "react-router-dom";

const Demo = () => {
  const { state } = useLocation();
  const employee = state?.employee;

  if (!employee) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg font-semibold">
        No employee data found. Please log in.
      </div>
    );
  }

  // Example mock attendance calculation
  const totalHours = employee.attendance?.reduce(
    (sum, a) => sum + (a.totalHours || 0),
    0
  ).toFixed(1);

  const handleQuickAction = (action) => {
    alert(`You selected: ${action}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {employee.name}! Here's your work summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Hours Worked */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Hours Worked</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {totalHours}
                <span className="text-lg"> hrs</span>
              </h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-clock text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Tasks Completed */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Tasks Completed</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">12/15</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-tasks text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Upcoming Leaves</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">3</h2>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <i className="fas fa-umbrella-beach text-amber-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Team Ranking */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Team Ranking</p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">#2</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-trophy text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Schedule & Activities remain same */}
        </div>

        {/* Right Column - Profile and Quick Actions */}
        <div className="lg:col-span-1">
          {/* Profile */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
            <img
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${employee.name}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold text-gray-800 mt-4">{employee.name}</h2>
            <p className="text-gray-600">{employee.role}</p>
            <div className="mt-4 bg-gray-100 rounded-lg p-4 text-sm text-left">
              <p className="mb-2"><strong>Email:</strong> {employee.email}</p>
              <p><strong>ID:</strong> {employee.id}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Punch In/Out", "Tasks", "Leave", "Reports"].map((action) => (
                <button
                  key={action}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg text-center transition duration-300"
                  onClick={() => handleQuickAction(action)}
                >
                  <i className="fas fa-circle block text-2xl mb-2"></i>
                  <span>{action}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
