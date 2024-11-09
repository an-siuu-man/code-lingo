'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/learningroute/');
      const data = await res.data;

      // Transform the object into an array of topic objects with subheadings
      const topicsArray = Object.entries(data).map(([key, subtopics]) => ({
        topic: key,
        subheadings: subtopics,
      }));

      setTopics(topicsArray);
    };
    fetchTopics();
  }, []);

  return (
    <nav className='w-[max-content] sticky top-0'>
      <h1 className='p-4 text-xl text-center'>Learning Topics</h1>
      <ul>
        {topics.map((topicObj, index) => (
          <li key={index}>
            <p className='p-2 font-[600] text-[#ff6b6b] font-[poppins]'>{topicObj.topic}</p>
            <ul className='topic-name'>
              <table>
                <tbody>
                  {topicObj.subheadings.map((subheading, idx) => (
                    <tr key={idx} className='cursor-pointer transition hover:text-[#FCA204]'>
                      <td className='w-[30px]'>
                        <p className='text-left sub-topic ml-8 mr-2 text-[15px]'>{`${idx + 1}.`}</p>
                      </td>
                      <td>
                        <p className='text-left sub-topic ml-2 text-[15px]'>{subheading}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
