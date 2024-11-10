'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../Sidebar';
import EditorMonaco from '../../components/EditorMonaco';
import TerminalComp from '../../components/Terminal';

export default function Training() {

    const params = useParams();
    const [incomingJSON, setIncomingJSON] = React.useState({}); // State to store incoming JSON data
    const [selectedLevel, setSelectedLevel] = React.useState(1); // State to store selected challenge level


    useEffect(() => {
        async function getCode(section, level) {
            try {
                const response = await axios.post('/api/training/', { section, level } , {
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

          getCode(params.slug.replace(/%20/g, ' '),'1');
          console.log('Incoming JSON TRAINING PAGE:', incomingJSON);
    } , []); // Empty useEffect to prevent infinite loop


    console.log('Incoming JSON TRAINING PAGE:', incomingJSON);

    async function handleLevelChange(section, level) {
        // Function to handle challenge level change
        

        console.log('Selected Level:', level, 'Section:', section);
        setSelectedLevel(level);
        try {
            const response = await axios.post('/api/training/', { section , level }, {
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



    return (
        <div className='relative flex w-full'>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Training page */}
            <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
                <Navbar />
                <div className='flex justify-between w-[90%] '>
                    <div className='flex flex-row items-center'>
                    <h1 className='training-header text-5xl font-[poppins] mr-4'>Training</h1><h1 className='training-header text-5xl font-[poppins] text-[#ff6b6b]'>Page</h1>
                    </div>
                    <div className=''>
                        <h1 className='text-center text-2xl font-[poppins] font-[700] '>Challenge Level</h1>
                        <ul className='flex flex-row justify-between '>
                            <li onClick = {() => {handleLevelChange(params.slug.replace(/%20/g, ' '), 1), setSelectedLevel(1)}} className={`${selectedLevel  === 1 ? 'bg-[#ff6b6b]' : "" } p-2 m-2 border-[2px] rounded border-[#ff6b6b] cursor-pointer font-[600] font-[poppins] transition hover:bg-[#ff6b6b] `}>Level 1</li>
                            <li onClick = {() => {handleLevelChange(params.slug.replace(/%20/g, ' '), 2), setSelectedLevel(2)}} className={`${selectedLevel  === 2 ? 'bg-[#ff6b6b]' : "" } p-2 m-2 border-[2px] rounded border-[#ff6b6b] cursor-pointer font-[600] font-[poppins] transition hover:bg-[#ff6b6b] `}>Level 2</li>
                            <li onClick = {() => {handleLevelChange(params.slug.replace(/%20/g, ' '), 3), setSelectedLevel(3)}} className={`${selectedLevel  === 3 ? 'bg-[#ff6b6b]' : "" } p-2 m-2 border-[2px] rounded border-[#ff6b6b] cursor-pointer font-[600] font-[poppins] transition hover:bg-[#ff6b6b] `}>Level 3</li>
                        </ul>
                    </div>
                </div>
                {/* Placeholder for additional sections or components
                <div className='absolute align-center' style={{fontFamily: 'source code pro'}}>
                    <p>Welcome to the Training Page. Here, you'll find exercises and challenges to test your coding skills.</p>
                </div>
                <div className='mt-[2vw] h-[20%] w-[100%]' style={{fontFamily: 'source code pro'}} > 
                    <EditorMonaco readOnly={true} height='500px' width='700px'/>
                    <TerminalComp/>
                </div> */}

                {/* Flex container for Editor and Terminal side by side */}
                <div
                    className="mt-[2vh] flex h-[500px] w-[90%] space-x-4"
                    style={{ fontFamily: 'source code pro' }}
>
                    {/* EditorMonaco on the left */}
                    <div
                        className="flex-grow p-4 h-[fit-content] bg-[#2e2e2e] rounded-lg shadow-lg"
                        style={{
                            width: 'fit-content',
                            borderRadius: '8px', // Rounded corners
                        }}>
                        <EditorMonaco readOnly={true} height="500px" width='650px' incomingCode={incomingJSON.code ? incomingJSON.code.replace(/\\n/g, '\n') : ''} />
                    </div>

                    {/* TerminalComp on the right */}
                    <div
                        className="flex-grow p-4 bg-[#2e2e2e] rounded-lg shadow-lg"
                        style={{
                            height: 'fit-content',
                            width: 'fit-content',
                            borderRadius: '8px', // Rounded corners
                            overflow: '', // Prevents overflow for rounded edges
                        }}>
                        <TerminalComp />
                    </div>
                </div>

            </div>
        </div>
    );
}
