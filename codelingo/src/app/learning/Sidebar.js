'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/learningroute/');
      const data = await res.data;

      const topicsArray = Object.entries(data).map(([key, subtopics]) => ({
        topic: key,
        subheadings: subtopics,
      }));

      setTopics(topicsArray);
    };
    fetchTopics();
  }, []);

  return (
    <nav
      className={`z-[99] learning-sidebar fixed top-0 left-0 h-full overflow-scroll bg-[#333] transition-all duration-300 ${
        isOpen ? 'w-[30vw]' : 'w-[5vw]'
      }`}
    >
      <div
        className={`p-2 text-${isOpen ? 'right' : 'center'} text-white cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Topics' : 'Show Topics'}
      </div>
      {isOpen && (
        <ul>
          <h1 className="p-4 text-xl text-center">Learning Topics</h1>

          {topics.map((topicObj, index) => (
            <li key={index}>
              <p className="pt-2 ml-8 font-[600] text-[#ff6b6b] font-[poppins]">{topicObj.topic}</p>
              <ul className="topic-name">
                <table className="w-[max-content]">
                  <tbody>
                    {topicObj.subheadings.map((subheading, idx) => (
                      <tr key={idx} className="cursor-pointer transition hover:text-[#FCA204]">
                        <td>
                          <p className="text-left min-w-[30px] sub-topic ml-8 mr-2 text-[15px]">
                            {`${idx + 1}.`}
                          </p>
                        </td>
                        <td>
                          <p className="text-left sub-topic ml-2 text-[15px]">{subheading}</p>
                        </td>
                      </tr>
                    ))}
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
