'use client';

import React, { use, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import EditorMonaco from '../../components/EditorMonaco';

export default function Learning() {

    const params = useParams();

    return (
        <div className='relative flex w-full'>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Learning page */}
            <div className='absolute left-[5vw] w-[95vw] items-right flex-grow' style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
                <Navbar />
                <h1>Learning Page</h1>
                
                {/* Placeholder for additional sections or components */}
                <div>
                    <p>Welcome to the Learning Page. Here, you'll find different coding concepts and interactive modules to learn about {params.slug}.</p>
                    <EditorMonaco />
                </div>
            </div>
        </div>
    );
}
