'use client';

// import { useState } from 'react';

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true);

//     const toggleSidebar = () => setIsOpen(!isOpen);

//     return (
//         <div style={{
//             width: isOpen ? '250px' : '0',
//             transition: 'width 0.3s',
//             overflow: 'hidden',
//             backgroundColor: '#333',
//             color: 'white',
//             height: '100vh',
//             padding: isOpen ? '20px' : '0',
//         }}>
//             <button onClick={toggleSidebar} style={{ marginBottom: '20px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
//                 {isOpen ? 'Close Menu' : 'Open Menu'}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h3>Sections</h3>
//                     <ul>
//                         <li>Basics and Setup</li>
//                         <li>Input and Output</li>
//                         <li>Operators</li>
//                         <li>Control Structures</li>
//                         <li>Functions</li>
//                         <li>Arrays and Strings</li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Sidebar;


// import { useState } from 'react';

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div>
//             <button onClick={toggleSidebar}>
//                 {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
//             </button>
//             {isOpen && (
//                 <div className="sidebar">
//                     {/* Sidebar content goes here */}
//                     <p>Sidebar is open
//                     this shows the sidebar content
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Sidebar;


//trying sidebar with slugs



import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pool } from '../api/db';
import axios from 'axios';


const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/learningroute/');
      const data = await res.data;
      console.log(data);
      setTopics(data);
    };
    fetchTopics();
  }, []);

  return (
    <nav className='w-[100px]'>
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/${topic.slug}`}>
              <a>{topic.number}. {topic.name}</a>
            </Link>
            <ul>
              {topic.sections && topic.sections.map((section) => (
                <li key={section.id} style={{ paddingLeft: '20px' }}>
                  <Link href={`/${topic.slug}/${section.slug}`}>
                    <a>{section.number} {section.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;


//-----------------------------------hardcoded sidebar-----------------------------------

// import { useState } from 'react';
// import Link from 'next/link';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   // Hardcoded sample data for topics and sections
//   const topics = [
//     {
//       id: 1,
//       name: 'Basics and Setup',
//       number: '1',
//       slug: 'basics-and-setup',
//       sections: [
//         { id: 11, name: 'Introduction', number: '1.1', slug: 'introduction' },
//         { id: 12, name: 'Installation', number: '1.2', slug: 'installation' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Input and Output',
//       number: '2',
//       slug: 'input-and-output',
//       sections: [
//         { id: 21, name: 'Basic Input', number: '2.1', slug: 'basic-input' },
//         { id: 22, name: 'Basic Output', number: '2.2', slug: 'basic-output' }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Operators',
//       number: '3',
//       slug: 'operators',
//       sections: [
//         { id: 31, name: 'Arithmetic Operators', number: '3.1', slug: 'arithmetic-operators' },
//         { id: 32, name: 'Logical Operators', number: '3.2', slug: 'logical-operators' }
//       ]
//     },
//     // Add more topics as needed
//   ];

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <div style={{
//       width: isOpen ? '250px' : '0',
//       transition: 'width 0.3s',
//       overflow: 'hidden',
//       backgroundColor: '#333',
//       color: 'white',
//       height: '100vh',
//       padding: isOpen ? '20px' : '0',
//     }}>
//       <button onClick={toggleSidebar} style={{ marginBottom: '20px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
//         {isOpen ? 'Close Menu' : 'Open Menu'}
//       </button>
      
//       {isOpen && (
//         <div>
//           <h3>Sections</h3>
//           <ul>
//             {topics.map((topic) => (
//               <li key={topic.id}>
//                 <Link href={`/${topic.slug}`}>
//                   {topic.number}. {topic.name}
//                 </Link>
//                 <ul>
//                   {topic.sections.map((section) => (
//                     <li key={section.id} style={{ paddingLeft: '20px' }}>
//                       <Link href={`/${topic.slug}/${section.slug}`}>
//                         {section.number} {section.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
