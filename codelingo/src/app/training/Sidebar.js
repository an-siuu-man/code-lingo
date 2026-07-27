'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/training/');
      const data = await res.data;
      console.log("DATA: ", res.data);
      const topicsArray = Object.entries(data).map(([key, subtopics]) => ({
        topic: key,
        subheadings: subtopics,
      }));

      setTopics(topicsArray);
      console.log("TOPICS: ", topicsArray);
    };
    fetchTopics();

  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);


  return (
    <nav
      ref={sidebarRef}
      className={`z-[99] training-sidebar fixed top-0 left-0 h-full overflow-scroll transition-all duration-300 ${
        isOpen ? 'w-[32vw]' : 'w-[5vw]'
      }`}
    >
      <div
        className={`flex items-right align-right w-[100%] cursor-pointer group`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='px-4 pt-6 transition-transform duration-300 group-hover:scale-110'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
        </div>
      </div>
      {isOpen && (
        <ul>
          <h1 className="py-4 ml-8 text-3xl font-[700] text-left fade-in-up">Training Topics</h1>

          {topics.map((topicObj, index) => (
            <li key={index} className="sidebar-item-in" style={{ animationDelay: `${index * 60}ms` }}>
              <p className="pt-3 ml-8 font-[600] text-[#ff6b6b] font-[poppins] tracking-wide">{topicObj.topic}</p>
              <ul className="topic-name">
                <table className="w-[max-content]">
                  <tbody>
                    {topicObj.subheadings.map((subheading, idx) => {
                      const isActive = pathname.includes(`${subheading.section.replace(/\s/g, '%20')}`);
                      return (
                        <tr key={idx} className={`sidebar-row ${isActive ? 'active' : ''} cursor-pointer`}>
                          <td>
                            <p className={`${isActive ? 'text-[#FCA204]' : ''} text-left min-w-[30px] sub-topic ml-6 mr-2 text-[15px] py-1`}>
                              {`${idx + 1}.`}
                            </p>
                          </td>
                          <td>
                            <Link
                              className={`${isActive ? 'text-[#FCA204]' : 'hover:text-[#ff6b6b]'} block text-left sub-topic ml-2 text-[15px] py-1 transition-colors duration-150`}
                              href={`/training/${subheading.section.replace(/\s/g, '%20')}`}>
                              {subheading.section}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Sidebar;
