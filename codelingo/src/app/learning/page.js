// import React from 'react';
// import Navbar from '../components/Navbar';

// export default function Learning() {
//     return (
//         <div>
//             <Navbar />
//             <h1>Learning Page</h1>
//         </div>
//     );
// }

'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from './Sidebar';

export default function Learning() {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar component on the left */}
            <Sidebar />

            {/* Main content area for the Learning page */}
            <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
                <Navbar />
                <h1>Learning Page</h1>
                
                {/* Placeholder for additional sections or components */}
                <div>
                    <p>Welcome to the Learning Page. Here, you'll find different coding concepts and interactive modules to learn from.</p>

                    {/* Example content area where new sections/components can be added */}
                    <section>
                        <h2>Section Title</h2>
                        <p>Content for this section goes here. You can add any components or details you need.</p>
                    </section>

                    {/* Add more sections/components here as needed */}
                </div>
            </div>
        </div>
    );
}
