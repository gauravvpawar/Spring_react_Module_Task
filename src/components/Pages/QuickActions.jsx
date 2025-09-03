import React from 'react'
import { useState, useEffect } from 'react';

const QuickActions = ({ employee, onActionSuccess, attendance }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [isPunchInDisabled, setIsPunchInDisabled] = useState(false);
  const [isPunchOutDisabled, setIsPunchOutDisabled] = useState(false);

  // Determine if user is currently clocked in
  const lastRecord = attendance && attendance.length > 0 ? attendance[attendance.length - 1] : null;
  const isClockedIn = lastRecord && lastRecord.punchOut === null;

  // Check localStorage on component mount to see if buttons were recently disabled
  useEffect(() => {
    const punchInDisabled = localStorage.getItem('punchInDisabled');
    const punchOutDisabled = localStorage.getItem('punchOutDisabled');
    
    if (punchInDisabled === 'true') {
      setIsPunchInDisabled(true);
    }
    
    if (punchOutDisabled === 'true') {
      setIsPunchOutDisabled(true);
    }
  }, []);

  const handlePunchAction = async (actionType) => {
    if (!employee?.id) {
      alert("Employee ID not found");
      return;
    }

    setIsLoading(true);
    setCurrentAction(actionType);
    
    // Immediately disable the button that was clicked and store in localStorage
    if (actionType === "punch-in") {
      setIsPunchInDisabled(true);
      localStorage.setItem('punchInDisabled', 'true');
      onActionSuccess("Punch in session started successfully!", 'success');
    } else if (actionType === "punch-out") {
      setIsPunchOutDisabled(true);
      localStorage.setItem('punchOutDisabled', 'true');
      onActionSuccess("Punch out completed successfully!", 'success');
    }
    
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
      
      // Clear the disabled state from localStorage after successful API call
      setTimeout(() => {
        localStorage.removeItem('punchInDisabled');
        localStorage.removeItem('punchOutDisabled');
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(`Error with ${actionType}:`, error);
      onActionSuccess(`${actionType.replace('-', ' ')} failed: ${error.message}`, 'error');
      
      // Re-enable the button if there was an error and clear localStorage
      if (actionType === "punch-in") {
        setIsPunchInDisabled(false);
        localStorage.removeItem('punchInDisabled');
      } else if (actionType === "punch-out") {
        setIsPunchOutDisabled(false);
        localStorage.removeItem('punchOutDisabled');
      }
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
      name: "Punch In", 
      icon: "sign-in-alt", 
      action: () => handlePunchAction("punch-in"),
      loading: isLoading && currentAction === "punch-in",
      disabled: isClockedIn || isPunchInDisabled // Disable if already clocked in or button was clicked
    },
    { 
      name: "Punch Out", 
      icon: "sign-out-alt", 
      action: () => handlePunchAction("punch-out"),
      loading: isLoading && currentAction === "punch-out",
      disabled: !isClockedIn || isPunchOutDisabled // Disable if not clocked in or button was clicked
    },
    { 
      name: "Leave", 
      icon: "calendar-alt", 
      action: handleLeaveAction,
      loading: false,
      disabled: false
    },
    { 
      name: "Tasks", 
      icon: "tasks", 
      action: handleTaskAction,
      loading: false,
      disabled: false
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className={`py-3 px-4 rounded-lg text-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              action.name.includes("Punch") 
                ? action.name === "Punch In" 
                  ? "bg-green-100 hover:bg-green-200 text-green-700" 
                  : "bg-red-100 hover:bg-red-200 text-red-700"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
            }`}
            onClick={action.action}
            disabled={action.loading || action.disabled || isLoading}
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



export default QuickActions;