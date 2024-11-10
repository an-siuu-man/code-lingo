// components/MonEditor.js
'use client';
import EditorMonaco from '@/app/components/EditorMonaco';
import JSONDisplay from '@/app/components/JSONDisplay'; // Component to display JSON
import React, { useState } from 'react';

export default function MonEditor() {
  const [incomingJSON, setIncomingJSON] = useState(''); // State for JSON data
  console.log('incomingJSON:', incomingJSON);

  return (
    <div>
      <div className='mt-10 w-[50%]'>
        {/* Pass setIncomingJSON to EditorMonaco */}
        <EditorMonaco setIncomingJSON={setIncomingJSON} />
      </div>

      {/* Pass incomingJSON as prop to JSONDisplay component */}
      <JSONDisplay data={incomingJSON} />
    </div>
  );
}