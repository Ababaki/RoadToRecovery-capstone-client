import React from 'react';
import './HelpModal.scss';

const SupportiveModal = ({ day, onDismiss }) => {
  return (
    <div className="supportive-modal">
      <div className="supportive-modal-content">
        <h1>It's okay, we all slip up sometimes. You decide when to make a change in your life, and help is just one click away!</h1>
        <div className='modal-btns'>
          <button className='help-btn'><a href='https://www.camh.ca/'>Get help now</a></button>
          <button className='dissmiss-btn' onClick={onDismiss}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default SupportiveModal;
