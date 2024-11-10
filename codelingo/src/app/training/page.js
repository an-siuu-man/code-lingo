'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import EditorMonaco from '../components/EditorMonaco';
import TerminalComp from '../components/Terminal';

export default function Training() {
    return (
        <div className='relative flex w-full'>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Training page */}
            <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
                <Navbar />
                <h1>Training Page</h1>
                
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
                    className="mt-[2vw] flex h-[500px] w-[100%] space-x-4"
                    style={{ fontFamily: 'source code pro' }}
>
                    {/* EditorMonaco on the left */}
                    <div
                        className="flex-grow p-4 bg-[#2e2e2e] rounded-lg shadow-lg"
                        style={{
                            width: '600px',
                            borderRadius: '8px', // Rounded corners
                        }}>
                        <EditorMonaco readOnly={true} height="500px" />
                    </div>

                    {/* TerminalComp on the right */}
                    <div
                        className="flex-grow p-4 bg-[#2e2e2e] rounded-lg shadow-lg"
                        style={{
                            width: '600px',
                            borderRadius: '8px', // Rounded corners
                            overflow: 'hidden', // Prevents overflow for rounded edges
                        }}>
                        <TerminalComp />
                    </div>
                </div>

            </div>
        </div>
    );
}
