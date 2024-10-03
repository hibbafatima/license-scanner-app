// app/javascript/components/LicenseDataDisplay.js

import React from 'react';

const LicenseDataDisplay = ({ data }) => (
  <div>
    <h2>License Data</h2>
    <p>Name: {data.name}</p>
    <p>Address: {data.address}</p>
    <p>Issuance Date: {data.issuance_date}</p>
    <p>Expiration Date: {data.expiration_date}</p>
    <p>License Number: {data.license_number}</p>
  </div>
);

export default LicenseDataDisplay;
