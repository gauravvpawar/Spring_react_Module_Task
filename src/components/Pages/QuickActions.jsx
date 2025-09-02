import React from 'react'
import { useState } from 'react';

const QuickActions = ({ employee, onActionSuccess, attendance }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  // Determine if user is currently clocked in
  const lastRecord = attendance && attendance.length > 0 ? attendance[attendance.length - 1] : null;
  const isClockedIn = lastRecord && lastRecord.punchOut === null;

  const handlePunchAction = async (actionType) => {
    if (!employee?.id) {
      alert("Employee ID not found");
      return;
    }

    setIsLoading(true);
    setCurrentAction(actionType);
    
    try {
      const url = `http://localhost:9092/attendance/${actionType}/${employee.id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.text();
      onActionSuccess(`${actionType.replace('-', ' ')} successful: ${data}`, 'success');
      
      // Refresh the page after successful action to update data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error with ${actionType}:`, error);
      onActionSuccess(`${actionType.replace('-', ' ')} failed: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
      setCurrentAction("");
    }
  };

  const handleTaskAction = () => {
    onActionSuccess("Tasks page will open shortly", 'info');
  };

  const handleLeaveAction = () => {
    onActionSuccess("Leave request page will open shortly", 'info');
  };

  const actions = [
    { 
      name: isClockedIn ? "Punch Out" : "Punch In", 
      icon: isClockedIn ? "sign-out-alt" : "sign-in-alt", 
      action: () => handlePunchAction(isClockedIn ? "punch-out" : "punch-in"),
      loading: isLoading && currentAction === (isClockedIn ? "punch-out" : "punch-in")
    },
    { 
      name: "Leave", 
      icon: "calendar-alt", 
      action: handleLeaveAction,
      loading: false
    },
    { 
      name: "Tasks", 
      icon: "tasks", 
      action: handleTaskAction,
      loading: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg text-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={action.action}
            disabled={action.loading || isLoading}
          >
            {action.loading ? (
              <i className="fas fa-spinner fa-spin block text-2xl mb-2"></i>
            ) : (
              <i className={`fas fa-${action.icon} block text-2xl mb-2`}></i>
            )}
            <span>{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};



export default QuickActions
