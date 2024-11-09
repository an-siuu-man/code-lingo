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
    <nav className='w-[max-content]'>
      <h1>Topics</h1>
      <ul>
        {topics.map((topicObj, index) => (
          <li key={index}>
            <p className='font-[Poppins]'>{topicObj.topic}</p>
            <ul>
              {topicObj.subheadings.map((subheading, idx) => (
                <li key={idx}>{`${idx+1}.${subheading}`}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
