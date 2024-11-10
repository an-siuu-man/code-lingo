// components/JSONDisplay.js
'use client';

import React from 'react';

const JSONDisplay = ({data}) => {
  console.log('data:', data);
  return (
    <div className="mt-4 p-4 bg-gray-900 text-white rounded">
      <h3>Parsed JSON Output:</h3>
      <pre>{data}</pre>
    </div>
  );
};

export default JSONDisplay;
