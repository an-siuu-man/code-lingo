'use client';

import React, { use, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import EditorMonaco from '../../components/EditorMonaco';
import axios from 'axios';

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
    return (
        <div className='relative flex w-full'>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Learning page */}
            <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
            <Navbar />
            <h1>Learning Page</h1>
                <div className='mr-[2vw] flex-grow p-4 bg-[#2e2e2e] rounded-lg shadow-lg'>
                    <EditorMonaco  readOnly={false} height='450px' width='50%' incomingCode = {incomingJSON.code ? incomingJSON.code.replace(/\\n/g, '\n') : ''} />

                </div>
            </div>
        </div>
    );
}
