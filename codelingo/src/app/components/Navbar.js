'use client';
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar(props) {

    const router = useRouter();
    const pathname = usePathname();
    
    return (
        <div className="flex w-full justify-between items-center sticky top-0  z-50">
            <div className="flex p-5 items-center cursor-pointer hover:scale-[1.1] duration-[200ms]" onClick={()=> {router.push('/')}}>
                <Image className='rounded-[50%] mr-[15px]' src={logo} width={50} height={50} alt='logo' />
                <h1 className="text-3xl ">Code</h1><h1 className="text-3xl text-[#FF6B6B]">Lingo</h1>
            </div>
            <div>
                { pathname != '/' && <Link href="/" className={`text-2xl mx-[25px] hover:text-[#FF6b6b] transition duration-200 ${props.isHighlighted == 'home' ? 'text-[#FF6B6B]' : 'text-[white]'}`}>Home</Link>}
                {/* <Link href="/login" className={`text-2xl mx-[25px] hover:text-[#FF6b6b] transition duration-200 ${props.isHighlighted == 'login' ? 'text-[#FF6B6B]' : 'text-[white]'}`}>Log In</Link> */}
            </div>
        </div>
    );
}