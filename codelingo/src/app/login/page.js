
//firebase integrated  login code

// src/app/LoginPage.js
'use client';



import Navbar from "../components/Navbar";
import PageButton from "../components/PageButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { signIn } from '../signup/authservice'; // Ensure the path is correct
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig"; // Import Firebase auth


export default function Login() {
    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if the user is already authenticated
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // Redirect to the learning page if the user is logged in
            router.push('/learning/Hello World Program');
          }
        });
    
        // Cleanup the listener on component unmount
        return () => unsubscribe();
      }, [router]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'logInEmail') {
            setLogInEmail(value);
        } else if (name === 'logInPassword') {
            setLogInPassword(value);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(logInEmail, logInPassword);
            setSuccess("User logged in successfully!");
            setError(null);
            router.push('/learning/Hello World Program'); // Redirect to learning page after successful login
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    const getEmailLabelClass = (inputValue) => {
        return inputValue ? 'in-focus' : '';
    };

    const getPasswordLabelClass = (inputValue) => {
        return inputValue ? 'in-focus' : '';
    };

    return (
        <div className="w-full">
            <Navbar isHighlighted='login' />
            <div className="flex w-full justify-center text-8xl mb-4 mt-10">
                <h1 className="text-center">Log</h1>
                <span className="mx-2"></span>
                <h1 className="text-[#FF6B6B]">In</h1>
            </div>
            <form onSubmit={handleLogin}>
                <div className="flex w-full flex-col items-center mt-10">
                    <div className={`${getEmailLabelClass(logInEmail)} w-[45%] mb-5 `}>
                        <input
                            type="email"
                            id="email"
                            name="logInEmail"
                            required
                            value={logInEmail}
                            onChange={handleInputChange}
                            className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='email-label' className={`absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='email'>Email</label>
                    </div>
                    <div className={`${getPasswordLabelClass(logInPassword)} w-[45%] mb-10`}>
                        <input
                            type="password"
                            id="password"
                            name="logInPassword"
                            required
                            value={logInPassword}
                            onChange={handleInputChange}
                            className={` block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='password-label' className={` absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='password'>Password</label>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className="flex justify-center align-center">
                        <PageButton label="Continue Learning" />
                    </div>
                    <div className="flex justify-center align-center">
                        <p className="my-5 text-xl">Don't have an account? <Link className="text-[#ff6b6b] border-[2px] border-[transparent] transition duration-[200ms] hover:border-b-[#ff6b6b]" href='/signup'>Sign up</Link>.</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

