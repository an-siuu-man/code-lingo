'use client';
import { useRouter } from "next/navigation";

export default function PageButton(props) {

    const router = useRouter();

    return (
        <button
         className="flex justify-center min-w-[200px] max-w-[350px] h-auto mx-[15px] px-[20px] py-[10px] border-solid border-[2px] border-[#FF6B6B] rounded-[10px] bg-[#1d1f21] text-white text-2xl duration-[200ms] hover:bg-[#FF6B6B] hover:text-[#1d1f21]"
         onClick = { props.route ? () => {router.push(props.route)} : props.handleClick}
        >{props.label}</button>
    );
}