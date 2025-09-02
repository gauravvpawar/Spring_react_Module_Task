import React from 'react'
import { useLocation } from "react-router-dom";
import ScheduleComponent from './ScheduleComponent';
import StatsCard from './StatsCard';
import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import EmployeeNavbar from './EmployeeNavbar';
import { useState } from 'react';
import Notification from  "./Notification"
import AttendanceStats from './Profile/AttendanceStats';
import AttendanceStatus from './Profile/AttendanceStatus';
import TodaysAttendance from './Profile/TodaysAttendance';

const Dashboard = () => {
  const { state } = useLocation();
  const employee = state?.employee;
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const handleLogout = () => {
    // Your logout logic here
    alert('Logging out...');
    // Typically you would redirect to login page
    // navigate('/login');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600 text-lg font-semibold">
          No employee data found. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeNavbar employee={employee} onLogout={handleLogout} />
      
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={hideNotification} 
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {employee.name}! Here's your work summary.
          </p>
        </div>

        {/* Stats Grid */}
        <AttendanceStats attendance={employee.attendance} />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <AttendanceStatus attendance={employee.attendance} />
            <TodaysAttendance attendance={employee.attendance} />
            
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {employee.attendance.slice(-3).reverse().map((record, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-4 ${
                      record.punchOut ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <i className={`fas ${record.punchOut ? 'fa-sign-out-alt' : 'fa-sign-in-alt'}`}></i>
                    </div>
                    <div>
                      <p className="font-medium">
                        {record.punchOut ? 'Punched out' : 'Punched in'} on {new Date(record.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {record.punchOut ? 
                          `Worked for ${record.totalHours ? record.totalHours.toFixed(2) + ' hours' : 'unknown duration'}` : 
                          'Currently clocked in'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile and Quick Actions */}
          <div className="lg:col-span-1">
            <ProfileCard employee={employee} />
            <QuickActions 
              employee={employee} 
              onActionSuccess={showNotification} 
              attendance={employee.attendance} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Dashboard
