// components/MonEditor.js
'use client';
import EditorMonaco from '@/app/components/EditorMonaco';
import React, { useState } from 'react';
import VisualizationPageStyled from '../components/Visu';

export default function MonEditor() {
  const [incomingJSON, setIncomingJSON] = useState({}); // State for JSON data
  console.log('incomingJSON:', incomingJSON);

  return (
    <div>
      <div className='mt-10 w-[50%]'>
        {/* Pass setIncomingJSON to EditorMonaco */}
        <EditorMonaco height='500px'setIncomingJSON={setIncomingJSON} />
      </div>

      {/* Pass incomingJSON as prop to JSONDisplay component */}
      <VisualizationPageStyled data={incomingJSON} />
    </div>
  );
}