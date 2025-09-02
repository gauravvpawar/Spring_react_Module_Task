import React from 'react'
import StatsCard from './TodaysAttendance';

const AttendanceStats = ({ attendance }) => {
  if (!attendance || attendance.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Today's Hours" value="0.0" unit="hrs" icon="clock" color="blue" />
        <StatsCard title="Weekly Hours" value="0.0" unit="hrs" icon="calendar-week" color="green" />
        <StatsCard title="Monthly Hours" value="0.0" unit="hrs" icon="calendar-alt" color="purple" />
        <StatsCard title="Total Sessions" value="0" icon="list-check" color="orange" />
      </div>
    );
  }

  // Calculate weekly and monthly totals
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const today = new Date().toISOString().split('T')[0];
  const todaysRecords = attendance.filter(record => record.date === today);
  const totalHoursToday = todaysRecords.reduce((total, record) => {
    return total + (record.totalHours || 0);
  }, 0);
  
  const weeklyHours = attendance.reduce((total, record) => {
    const recordDate = new Date(record.date);
    if (recordDate >= oneWeekAgo && record.totalHours) {
      return total + record.totalHours;
    }
    return total;
  }, 0);
  
  const monthlyHours = attendance.reduce((total, record) => {
    const recordDate = new Date(record.date);
    if (recordDate >= oneMonthAgo && record.totalHours) {
      return total + record.totalHours;
    }
    return total;
  }, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Today's Hours" value={totalHoursToday.toFixed(1)} unit="hrs" icon="clock" color="blue" />
      <StatsCard title="Weekly Hours" value={weeklyHours.toFixed(1)} unit="hrs" icon="calendar-week" color="green" />
      <StatsCard title="Monthly Hours" value={monthlyHours.toFixed(1)} unit="hrs" icon="calendar-alt" color="purple" />
      <StatsCard title="Total Sessions" value={attendance.length} icon="list-check" color="orange" />
    </div>
  );
};


export default AttendanceStats
