import React from 'react';
import "../assets/styles.css";


const Calendar = () => {
  return (
    <div className="calendar glass-card">
      <h2 className="title">📅 Calendar</h2>
      <input type="date" className="calendar-input" />
      <textarea placeholder="Add your task..." className="calendar-note"></textarea>
      <button className="btn">Save</button>
    </div>
  );
};

export default Calendar;
