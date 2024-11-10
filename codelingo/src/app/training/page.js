'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../learning/Sidebar';
import EditorMonaco from '../components/EditorMonaco';

export default function Training() {
    return (
        <div className='relative flex w-full'>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Training page */}
            <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
                <Navbar />
                <h1>Training Page</h1>
                
                {/* Placeholder for additional sections or components */}
                <div className='absolute align-center' style={{fontFamily: 'source code pro'}}>
                    <p>Welcome to the Training Page. Here, you'll find exercises and challenges to test your coding skills.</p>
                </div>
                <div className='mt-[2vw] h-[20%] w-[100%]' style={{fontFamily: 'source code pro'}} > 
                    <EditorMonaco/>
                </div>
            </div>
        </div>
    );
}
