'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Sidebar = (props) => {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/learningroute/');
      const data = await res.data;
      console.log("DATA: ", res.data);
      const topicsArray = Object.entries(data).map(([key, subtopics]) => ({
        topic: key,
        subheadings: subtopics,
      }));

      setTopics(topicsArray);
    };
    fetchTopics();

  }, []);
  console.log(topics);
  return (
    <nav
      className={`z-[99] learning-sidebar fixed top-0 left-0 h-full overflow-scroll bg-[#333] transition-all duration-300 ${
        isOpen ? 'w-[30vw]' : 'w-[5vw]'
      }`}
    >
      <div
        className={`flex items-right align-right w-[100%] cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <p className='text-right'>Hide Topics</p> : <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 256 256">
<g fillOpacity="0" fill="#dddddd" height={'20px'} width={'20px'} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(3.55556,3.55556)"><path d="M56,48c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0zM56,32c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0zM56,16c2.209,0 4,1.791 4,4c0,2.209 -1.791,4 -4,4c-1.202,0 -38.798,0 -40,0c-2.209,0 -4,-1.791 -4,-4c0,-2.209 1.791,-4 4,-4c1.202,0 38.798,0 40,0z"></path></g></g>
</svg>}
      </div>
      {isOpen && (
        <ul>
          <h1 className="py-4 ml-8 text-xl text-left">Learning Topics</h1>

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
                          <Link className="text-left sub-topic ml-2 text-[15px]" href={`/learning/${subheading}`}>
                            {subheading}
                          </Link>
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
