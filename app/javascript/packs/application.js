// app/javascript/packs/application.js
import React from 'react';
import ReactDOM from 'react-dom';
import WebcamCapture from '../components/WebcamCapture';
import captureData from '../components/ProcessCapturedImage';

document.addEventListener('DOMContentLoaded', () => {
  // Function to redirect to the capture page
  const startCapturePage = () => {
    window.location.href = '/license_data/capture';
  };

  // Function to redirect to the display page
  const startDisplayPage = () => {
    window.location.href = '/license_data/display';
  };

  // Event listeners for the navigation buttons
  const captureButton = document.getElementById('captureButton');
  const displayButton = document.getElementById('displayButton');

  if (captureButton) {
    captureButton.addEventListener('click', startCapturePage);
  }

  if (displayButton) {
    displayButton.addEventListener('click', startDisplayPage);
  }

  // Render the WebcamCapture component inside the 'webcam-container'
  const webcamContainer = document.getElementById('webcam-container');
  if (webcamContainer) {
    ReactDOM.render(<WebcamCapture onCapture={captureData} />, webcamContainer);
  }
});
