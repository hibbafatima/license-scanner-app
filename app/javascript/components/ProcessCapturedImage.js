// app/javascript/components/ProcessCapturedImage.js
const captureData = async () => {
  const video = document.querySelector('video'); // Assuming there's only one video element on the page

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');

    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    const response = await fetch('/license_data/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ image_data: imageData }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Captured data:', data);
      // Optionally update the UI with the extracted data
    } else {
      console.error('Failed to send captured data to the server');
    }
  } catch (error) {
    console.error('Error capturing data:', error);
  }
};

export default captureData;
