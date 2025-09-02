import React from 'react'

const ScheduleComponent = ({ schedule }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Today's Schedule</h2>
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full bg-${item.color}-500 mr-4`}></div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-600">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleComponent
