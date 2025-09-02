import React from 'react'

const StatsCard = ({ title, value, unit, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
            {unit && <span className="text-lg"> {unit}</span>}
          </h2>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>
          <i className={`fas fa-${icon} text-${color}-600 text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard
