import React, { useState } from 'react';
import './SobrietyLog.scss';

// Define the SobrietyLog component as a function that takes in props
const SobrietyLog = ({ day, used, handleLog }) => {
  // Define a state variable called isUsed and initialize it to the value of the used prop
  const [isUsed, setIsUsed] = useState(used);

  // Define a function called handleUsed that sets isUsed to true and calls the handleLog function with the day and true arguments
  const handleUsed = () => {
    setIsUsed(true);
    handleLog(day.toISOString(), true);
  };

  // Define a function called handleDidNotUse that sets isUsed to false and calls the handleLog function with the day and false arguments
  const handleDidNotUse = () => {
    setIsUsed(false);
    handleLog(day.toISOString(), false);
  };

  // Render the component with the following JSX code
  return (
    <div>
       {/* Display the date using the toLocaleDateString method */}
       <p className='date'> {day.toLocaleDateString()}</p>
       {/* Display whether the user used or did not use */}
      <p>{isUsed}</p>
      {/* Create a div for the buttons */}
      <div className='log-btn'>
        {/* Create a button with a click event that calls the handleUsed function */}
        <button className='used-btn' onClick={handleUsed}>Used</button>
        {/* Create a button with a click event that calls the handleDidNotUse function */}
        <button className='did-not-use-btn' onClick={handleDidNotUse}>Did Not Use</button>
      </div>   
    </div>
  );
};

// Export the SobrietyLog component as the default export
export default SobrietyLog;
