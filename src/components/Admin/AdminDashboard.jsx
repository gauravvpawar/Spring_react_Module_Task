import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:9091/employees/fetchAll');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(employeeId);
    
    try {
      const response = await fetch(`http://localhost:9091/employees/DeleteById/${employeeId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      
      // Remove the employee from the local state
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      
      // Show success message
      alert('Employee deleted successfully!');
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Calculate statistics
  const totalEmployees = employees.length;
  const employeesWithAttendance = employees.filter(emp => emp.attendance && emp.attendance.length > 0).length;
  const activeToday = employees.filter(emp => 
    emp.attendance && emp.attendance.some(a => a.date === new Date().toISOString().split('T')[0])
  ).length;

  // Filter employees based on role and search term
  const filteredEmployees = employees.filter(employee => {
    const matchesRole = filterRole === 'All' || employee.role === filterRole;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Calculate total hours for an employee
  const calculateTotalHours = (attendance) => {
    if (!attendance || attendance.length === 0) return 0;
    return attendance.reduce((total, record) => total + (record.totalHours || 0), 0).toFixed(2);
  };

  // Get today's status for an employee
  const getTodayStatus = (attendance) => {
    if (!attendance || attendance.length === 0) return 'Absent';
    
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = attendance.filter(record => record.date === today);
    
    if (todayRecords.length === 0) return 'Absent';
    
    const lastRecord = todayRecords[todayRecords.length - 1];
    return lastRecord.punchOut === null ? 'Clocked In' : 'Clocked Out';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-blue-500 text-4xl mb-4"></i>
          <p className="text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
          <p className="text-lg font-semibold">Error: {error}</p>
          <button 
            onClick={fetchEmployees}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Employee Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-user-shield text-blue-500 text-2xl"></i>
              <span className="text-gray-700">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Employees</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{totalEmployees}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Active Today</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{activeToday}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <i className="fas fa-user-check text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">With Attendance</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">{employeesWithAttendance}</h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <i className="fas fa-calendar-check text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search employees by name or email..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
              <button
                onClick={fetchEmployees}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Today's Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Sessions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No employees found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://api.dicebear.com/8.x/initials/svg?seed=${employee.name}`}
                              alt={employee.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getTodayStatus(employee.attendance) === 'Clocked In' 
                            ? 'bg-green-100 text-green-800'
                            : getTodayStatus(employee.attendance) === 'Clocked Out'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {getTodayStatus(employee.attendance)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {calculateTotalHours(employee.attendance)} hrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.attendance ? employee.attendance.length : 0} sessions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 ml-2"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          disabled={deleteLoading === employee.id}
                        >
                          {deleteLoading === employee.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredEmployees.length} of {totalEmployees} employees
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;