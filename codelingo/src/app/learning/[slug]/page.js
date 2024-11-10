'use client';

import React, { use, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import EditorMonaco from '../../components/EditorMonaco';
import axios from 'axios';
import VisualizationPageStyled from '@/app/components/Visu';

export default function Learning() {

    const params = useParams();
    const [incomingJSON, setIncomingJSON] = useState({});


    useEffect(() => {
        async function getCode(section) {
            try {
                const response = await axios.post('/api/learningroute/', { section } , {
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              const sax = await response.data;
              setIncomingJSON(sax); // Update incomingJSON state in MonEditor
        
            } catch (error) {
              console.error('Error retrieving code:', error);
            }
          }

          getCode(params.slug.replace(/%20/g, ' '));

    }, [params.slug]);

    console.log('Incoming JSON:', incomingJSON);
//     return (
//         <div className='relative flex w-full'>
//             {/* Sidebar component on the left */}
//             <Sidebar />

//             {/* Main content area for the Learning page */}
//             <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
//             <Navbar />
//             <h1>Learning Page</h1>
//                 <div className='mr-[2vw] flex-grow p-4 bg-[#2e2e2e] rounded-lg shadow-lg'>
//                     <EditorMonaco  readOnly={false} height='450px' width='50%' incomingCode = {incomingJSON.code ? incomingJSON.code.replace(/\\n/g, '\n') : ''} />
//                     <VisualizationPageStyled />
//                 </div>

//             </div>
//         </div>
//     );
// }

return (
  <div className="relative flex w-full">
      {/* Sidebar component on the left */}
      <Sidebar />

      {/* Main content area for the Learning page */}
      <div
          className="absolute left-[5vw] w-[95vw] flex-grow"
          style={{
              backgroundColor: '#1e1e1e',
              color: 'white',
              minHeight: '100vh',
          }}
      >
          <Navbar />
          <h1>Learning Page</h1>

          {/* Container for Editor and Visualization side-by-side */}
          <div
              className="flex space-x-4 p-4 bg-[#2e2e2e] rounded-lg shadow-lg"
              style={{ margin: '20px', borderRadius: '8px' }}
          >
              {/* EditorMonaco on the left */}
              <div
                  className="flex-grow p-4 "
                  style={{
                      backgroundColor: '#333333',
                      width: '50%',
                      height: '450px',
                  }}
              >
                  <EditorMonaco
                      readOnly={false}
                      height="450px"
                      width="100%"
                      incomingCode={incomingJSON.code ? incomingJSON.code.replace(/\\n/g, '\n'): ''}
                      setIncomingJSON={setIncomingJSON}
                      />
              </div>

              {/* VisualizationPageStyled on the right */}
              <div
                  className="flex-grow p-4 "
                  style={{
                      backgroundColor: '#333333',
                      width: '50%',
                      height: '450px',
                      overflowY: 'auto', // Allow scrolling if content overflows
                  }}
              >
                  <VisualizationPageStyled data={incomingJSON ? incomingJSON : {}}/>
              </div>
          </div>
      </div>
  </div>
  );
}