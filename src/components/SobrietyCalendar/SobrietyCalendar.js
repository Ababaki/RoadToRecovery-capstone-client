import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Importing the Calendar and momentLocalizer components from react-big-calendar
import moment from 'moment'; // Importing the moment library for working with dates
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importing the default styles for react-big-calendar
import SobrietyLog from '../SobrietyLog/SobrietyLog';
import CongratsModal from '../CongratsModal/CongratsModal'; 
import './SobrietyCalendar.scss'; 
import SupportiveModal from '../HelpModal/HelpModal';

// Creating a localizer object for react-big-calendar using moment.js
const localizer = momentLocalizer(moment);

// Defining the SobrietyCalendar component
const SobrietyCalendar = props => {
  // Defining the component's state variables using the useState hook
  const [log, setLog] = useState({}); // Object to keep track of sobriety logs
  const [selectedDay, setSelectedDay] = useState(null); // Selected day on the calendar
  const [showCongrats, setShowCongrats] = useState(false); // Flag to show congrats modal
  const [showSupportive, setShowSupportive] = useState(false); // Flag to show supportive message
  const [cleanStreak, setCleanStreak] = useState(0); // Count of clean days
  const [usedStreak, setUsedStreak] = useState(0); // Count of used days in a row

  // Function to handle sobriety logging for a specific day
  const handleLog = (day, used) => {
    const newLog = { ...log, [day]: used };
    setLog(newLog);
    localStorage.setItem('sobrietyLog', JSON.stringify(newLog));
  
    if (used) {
      setCleanStreak(0);
      setUsedStreak(prevStreak => prevStreak + 1); // increment the used streak by 1
  
      if (usedStreak >= 2) {
        setShowSupportive(true); // display the supportive modal
        setUsedStreak(0); // reset the used streak to 0
      }
    } else {
      setCleanStreak(prevStreak => prevStreak + 1);
      setUsedStreak(0); // reset the used streak to 0
  
      if (cleanStreak + 1 >= 7) {
        setShowCongrats(true);
      }
    }
  };
  
  
  

  // Function to dismiss the supportive message
  const handleSupportiveDismiss = () => {
    setShowSupportive(false);
  }

  // Function to dismiss the congrats modal
  const handleCongratsDismiss = () => {
    setShowCongrats(false);
  }

  // Function to handle calendar day selection
  const handleSelect = ({ start }) => {
    const today = new Date(); // Get the current date
    if (start <= today) { // If the selected day is not in the future
      setSelectedDay(start); // Set the selected day as the new state
    }
  };

  // Function to reset the sobriety log
  const handleReset = () => {
    setLog({}); // Reset the sobriety log state
    localStorage.removeItem('sobrietyLog'); // Remove the sobriety log from local storage
  }
  const events = Object.keys(log).map(day => ({
    start: moment(day).toDate(),
    end: moment(day).toDate(),
    title: log[day] ? 'Used' : 'Did not use',
  }));
  

  

  // Function to set the class name and click event handler for a specific day on the calendar
  const dayPropGetter = date => {
    const today = new Date(); // Get the current date
    if (date < today) { // If the day is in the past
      return {
        className: 'selectable', // Add the selectable class name for styling
        onClick: () => setSelectedDay(date), // Set the selected day as the new state when clicked
      };
    } else { // If the day is in the future
      return {
        className: 'unselectable', // Add the unselectable class name for styling
      };
    }
  };

  // useEffect hook to retrieve the sobriety log from local storage when the component mounts
  useEffect(() => {
    const sobrietyLog = localStorage.getItem('sobrietyLog'); // Get the sobriety log from local storage
    if (sobrietyLog) { // If the sobriety log exists in local storage
      setLog(JSON.parse(sobrietyLog)); // Set the sobriety log state to the retrieved value
    }
  }, []);

  // useEffect hook to dismiss the supportive message after 3 seconds
  useEffect(() => {
    if (showSupportive) { // If the supportive message is being displayed
      const timer = setTimeout(() => { // Set a timer to dismiss the message after 3 seconds
        setShowSupportive(false);
      }, 3000);
      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, [showSupportive]);

  // Rendering the SobrietyCalendar component
  return (
    <div>
      

      {/* React big calendar component */}
      <Calendar
        localizer={localizer}
        events={events}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={event => setSelectedDay(event.start)}
        onSelectSlot={handleSelect}
        dayPropGetter={dayPropGetter}
        style={{ height: 500 }}
      />

      {/* SobrietyLog component */}
      {selectedDay && (
        <SobrietyLog
          day={selectedDay}
          used={log[selectedDay.toISOString()] || false}
          handleLog={handleLog}
        />
      )}
      {/* Button to reset the sobriety log */}
      <div className="button-container">
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>

      {/* Supportive message */}
      {showSupportive && (
        <div className="supportive-message" onClick={handleSupportiveDismiss}>
          {cleanStreak > 0 ?
            `Congratulations! One Step Closer to Changing Your Life Every Day!`
            :
            `Its OK, We All Slip Up Sometimes. Know There Is Support. Tomorrow Is Another Day to Try Again!`
          }
        </div>
      )}

      {/* Congrats modal */}
      {showCongrats && (
        <CongratsModal day={selectedDay} onDismiss={handleCongratsDismiss} />
      )}
     {showSupportive && (
  <SupportiveModal day={selectedDay} onDismiss={() => setShowSupportive(true)} />
)}

     
     
    </div>
  );
};

export default SobrietyCalendar;

