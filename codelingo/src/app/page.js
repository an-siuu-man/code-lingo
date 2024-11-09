'use client';
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import PageButton from "./components/PageButton";
import { useRouter } from "next/navigation";
import { SparklesPreview } from "./components/UI/sparklespreview";
import ProjectContributor from "./components/ProjectContributor";
import logo from "../../public/Photo.png";
import shibhans from "../../public/shibhans_pfp.jpg";
import leo from "../../public/leo.jpg";
import jay from "../../public/jay_pfp.png";
export default function Home() {

  const handleAboutUs = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }



//   return (
//     <div className="w-full">
//       <Navbar isHighlighted = 'home' />
//       <div className="p-5 mt-20">

//         </div>
//         {/* using the component directly to make it easier */}
//         <SparklesPreview /> 
//         <div className="flex justify-center">
//           <PageButton label='Get Started' route='signup' />
//           <PageButton label='Learn More' handleClick={handleAboutUs} />
//         </div>
//       </div>
//       <div className="about h-[100vh]">
//         <div className="flex w-full space-x-5 justify-center text-8xl mb-4">
//           <h1 className="text-center">About</h1>
//           <h1 className="" style={{ 'color': '#FF6B6B' }}>Us</h1>
//         </div>
//         <div className="hello flex justify-center">
//           <div className="flex flex-col items-center">
//             <h1 className="text-6xl p-5 font-[300] font-[Poppins]">Meet the <b className="text-[#ff6b6b]">{'Developers</>'}</b></h1>
//             <ProjectContributor name='Ansuman Sharma' image={logo} type='primary' />
//             <ProjectContributor name='Leo Cabezas Amigo' image={leo} type='secondary' />
//             <ProjectContributor name='Shivansh Shrivas' image={shibhans} type='primary' />
//             <ProjectContributor name='Jay Patel' image={jay} type='secondary' />
//           </div>
//         </div>
//       </div>
//   );
// }

return (
  <div className="w-full">
    <Navbar isHighlighted='home' />
    <div className="h-[100vh] mt-20">
      {/* using the component directly to make it easier */}
      <SparklesPreview />
      <div className="flex justify-center">
        <PageButton label='Get Started' route='signup' />
        <PageButton label='Learn More' handleClick={handleAboutUs} />
      </div>
    </div>
    <div className="about h-[100vh]">
      <div className="flex w-full space-x-5 justify-center text-8xl mb-4">
        <h1 className="text-center">About</h1>
        <h1 className="" style={{ 'color': '#FF6B6B' }}>Us</h1>
      </div>
      <div className="hello flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl p-5 font-[300] font-[Poppins]">Meet the <b className="text-[#ff6b6b]">{'Developers</>'}</b></h1>
          <ProjectContributor name='Ansuman Sharma' image={logo} type='primary' />
          <ProjectContributor name='Leo Cabezas Amigo' image={leo} type='secondary' />
          <ProjectContributor name='Shivansh Shrivas' image={shibhans} type='primary' />
          <ProjectContributor name='Jay Patel' image={jay} type='secondary' />
        </div>
      </div>
    </div>
  </div>
);
}