// app/javascript/components/WebcamCapture.js
import React, { useRef, useState } from 'react';

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef();
  const [stream, setStream] = useState(null);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Webcam access granted:', mediaStream);
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureData = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get base64 data URL of the image
    const imageData = canvas.toDataURL('image/jpeg');

    // Stop the webcam
    stopWebcam();

    // Call the parent component's callback function with the captured data
    onCapture(imageData);
  };

  return (
    <div>
      <button onClick={startWebcam}>Start Webcam</button>
      <button onClick={captureData}>Capture Data</button>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
    </div>
  );
};

export default WebcamCapture;
