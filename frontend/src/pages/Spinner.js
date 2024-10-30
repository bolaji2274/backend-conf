import React from 'react';
import '../styles/spinner.css' // Make sure to create this CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
