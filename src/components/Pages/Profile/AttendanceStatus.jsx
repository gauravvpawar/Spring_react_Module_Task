import React from 'react'

const AttendanceStatus = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Status</h2>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
          <div className="flex items-center">
            <i className="fas fa-clock text-2xl mr-3"></i>
            <div>
              <p className="font-semibold">Not Clocked In Today</p>
              <p className="text-sm mt-1">You haven't punched in yet today</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lastRecord = attendance[attendance.length - 1];
  const isClockedIn = lastRecord.punchOut === null;
  const today = new Date().toISOString().split('T')[0];
  const todaysRecords = attendance.filter(record => record.date === today);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Current Status</h2>
      <div className={`p-4 rounded-lg ${isClockedIn ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
        <div className="flex items-center">
          <i className={`fas ${isClockedIn ? 'fa-check-circle' : 'fa-clock'} text-2xl mr-3`}></i>
          <div>
            <p className="font-semibold">{isClockedIn ? 'Currently Clocked In' : 'Not Clocked In'}</p>
            {isClockedIn && (
              <p className="text-sm mt-1">
                Since: {new Date(lastRecord.punchIn).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatus
