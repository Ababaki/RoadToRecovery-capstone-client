import React from 'react';
import './CongratsModal.scss'; 

const CongratsModal = ({ day, onDismiss }) => {
  return (
    <div className="congrats-modal">
      <div className="congrats-modal-content">
        <h1>Congratulations on your 7 Day clean streak! Keep up the Good work!</h1>
        <div className='modal-btns'>
        <button className='camh'><a href='https://www.camh.ca/'>For more Support visit CAMH</a></button>
        <button className='dissmiss-btn' onClick={onDismiss}>Dismiss</button>
        </div>
       
      </div>
    </div>
  );
};

export default CongratsModal;
