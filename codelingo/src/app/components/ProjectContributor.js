import Image from "next/image";

export default function ProjectContributor(props) {

    const roles = {
        'Shivansh Shrivas': 'Fullstack Developer',
        'Ansuman Sharma': 'Fullstack Developer',
        'Leo Cabezas Amigo': 'Backend Developer',
        'Jay Patel': 'Frontend Developer'
    }
    const socials = {
        'Shivansh Shrivas': {
            'linkedin': 'https://www.linkedin.com/in/shivansh-shrivas/',
            'github': 'https://github.com/shivanshshrivas'    
        },
        'Ansuman Sharma': {
            'linkedin': 'https://www.linkedin.com/in/ansuman-sharma/',
            'github': 'https://github.com/an-siuu-man'
        },
        'Leo Cabezas Amigo': {
            'linkedin': 'https://www.linkedin.com/in/leo-cabezas-amigo/',
            'github': 'https://github.com/leo-cabezas-amigo'
        },
        'Jay Patel': {
            'linkedin': 'https://www.linkedin.com/in/jaypatel2004/',
            'github': 'https://github.com/JayP04'
        }
    }
    const descriptions = {
        'Shivansh Shrivas': 'Shivansh is a versatile Fullstack Developer with expertise in both frontend and backend technologies. He has built comprehensive and efficient web applications ranging from a decentralized music gallery app to a study revision app leveraging generative AI and speech-to-text models. He is responsible for the PostgreSQL database infrastructure for CodeLingo.',
        'Ansuman Sharma': 'Ansuman is a skilled Fullstack Developer who excels in creating seamless user experiences and robust backend systems. He has worked on a number of frameworks in multiple languages such as Python, JavaScript, and C#. He implemented the design for CodeLingo and integrated the backend with the frontend.',
        'Leo Cabezas Amigo': "Leo is a skilled computer engineer and has worked on projects involving designing and programming embedded systems such as Raspberry Pi's and Arduino kits. He developed the input code parser in the CodeLingo backend.",
        'Jay Patel': 'Jay is a creative Frontend Developer with a keen eye for design and user experience. He has worked on a number of projects involving React and Next.js. He is jointly responsible for the frontend design and user experience of CodeLingo along with Ansuman.'
    }
    
    return (
        <div className="project-contributor w-[80%] aspect-[4/1] bg-black my-[15px]">
            <div className="block bg-[#FF6B6B] w-[97.5%] h-[90%]">
                {props.type == 'primary' && 
                    <div className="card-contents flex h-[100%] ">
                        <div className="left-container aspect-[1/1] h-[100%] bg-blue-300">
                        <Image src={props.image} alt={`${props.name}'s image`}  className="w-[100%] h-[100%] object-cover" />
                        </div>
                        <div className="right-container h-[100%] p-[20px] flex flex-col justify-between">
                            <div className="text-content"> 
                                <div className="flex justify-left space-x-3">
                                    <h1 className="text-4xl font-[600] text-[#333333] font-[Poppins]" >{props.name} |</h1><h1 className="text-4xl font-[300] italic text-[#fff] font-[Poppins]">{roles[props.name]}</h1>
                                </div>
                                <p className="text-2xl text-[#333333]">{descriptions[props.name]}</p>
                            </div>
                            <div className="socials flex space-x-5">
                                <a className = 'transition border border-[transparent] hover:border-b-[white] text-xl' href={socials[props.name]['github']} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a className = 'transition border border-[transparent] hover:border-b-[white] text-xl' href={socials[props.name]['linkedin']} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                }
                {props.type == 'secondary' && 
                    <div className="card-contents flex h-[100%]">
                        <div className="left-container h-[100%] p-[20px] flex flex-col justify-between">
                            <div className="text-content">
                                <div className="flex justify-left space-x-3">
                                    <h1 className="text-4xl font-[600] text-[#fff] font-[Poppins]">{props.name} |</h1><h1 className="text-4xl font-[300] italic text-[#333333] font-[Poppins]">{roles[props.name]}</h1>
                                </div>
                                <p className="text-2xl text-[#333333]">{descriptions[props.name]}</p>
                            </div>
                            <div className="socials flex space-x-5">
                                <a className = 'transition border border-[transparent] hover:border-b-[white] text-xl' href={socials[props.name]['github']} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a className = 'transition border border-[transparent] hover:border-b-[white] text-xl' href={socials[props.name]['linkedin']} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </div>
                        </div>
                        <div className="left-container aspect-[1/1] h-[100%] bg-blue-300">
                        <Image src={props.image} alt={`${props.name}'s image`}  className="w-[100%] h-[100%] object-cover" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}