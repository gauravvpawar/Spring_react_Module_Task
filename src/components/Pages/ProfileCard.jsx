import React from 'react'

const ProfileCard = ({ employee }) => {
  return (
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

        {/* <p className="mt-2"><strong>Department:</strong> {employee.department || "Engineering"}</p> */}
      
      </div>
    </div>
  );
};

export default ProfileCard
