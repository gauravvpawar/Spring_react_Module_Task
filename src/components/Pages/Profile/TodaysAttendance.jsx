import React from 'react'

const TodaysAttendance = ({ attendance }) => {
  // Add a safety check to handle undefined or null attendance
  if (!attendance) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Attendance</h2>
        <p className="text-gray-500">No attendance data available</p>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const todaysRecords = attendance.filter(record => record.date === today);
  
  if (todaysRecords.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Attendance</h2>
        <p className="text-gray-500">No attendance records for today</p>
      </div>
    );
  }

  const totalHoursToday = todaysRecords.reduce((total, record) => {
    return total + (record.totalHours || 0);
  }, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Attendance</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Sessions</p>
          <p className="text-2xl font-bold">{todaysRecords.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Hours Today</p>
          <p className="text-2xl font-bold">{totalHoursToday.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Today's Sessions:</p>
        <div className="space-y-2">
          {todaysRecords.map((record, index) => (
            <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
              <span>
                {new Date(record.punchIn).toLocaleTimeString()} - 
                {record.punchOut ? new Date(record.punchOut).toLocaleTimeString() : 'Ongoing'}
              </span>
              <span className="font-medium">
                {record.totalHours ? record.totalHours.toFixed(2) + 'h' : 'In progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendance
