// 'use client';

// import Navbar from "../components/Navbar";
// import PageButton from "../components/PageButton";
// import { useState } from "react";
// import Link from "next/link";
// import { signUp } from './authService';


// export default function SignUp() {
    

//     const [signUpUsername, setSignupUsername] = useState('');
//     const [signUpEmail, setSignupEmail] = useState('');
//     const [signUpPassword, setSignupPassword] = useState('');
//     const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'signupEmail') {
//             setSignupEmail(value);
//         } else if (name === 'signupUsername') {
//             setSignupUsername(value);
//         } else if (name === 'signupPassword') {
//             setSignupPassword(value);
//         } else if (name === 'signupConfirmPassword') {
//             setSignupConfirmPassword(value);
//         }
//     };

//     const getUsernameLabelClass = (inputValue) => {
//         return inputValue ? 'in-focus-valid' : '';
//     };

//     const getEmailLabelClass = (inputValue) => {
//         if (inputValue) {
//             if (inputValue.includes('@') && inputValue.includes('.')) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         } else {
//             return '';
//         }
//     };

//     const getPasswordLabelClass = (passVal, confirmPassVal) => {
//         if (passVal) {
//             if (passVal === confirmPassVal) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         }
        
//         return '';
            
//     };

//     return (
//         <div className="w-full">
//             <Navbar isHighlighted = 'signup' />
//             <div className="flex w-full justify-center text-8xl mb-4 mt-10">
//                 <h1 className="text-center">Sign</h1>
//                 <span className="mx-2"></span>
//                 <h1 className="text-[#FF6B6B]">Up</h1>
//             </div>
//             <form>
//                 <div className="flex w-full flex-col items-center mt-10">
//                     <div className={`${getUsernameLabelClass(signUpUsername)} w-[45%] mb-5 `}>
//                         <input 
//                          type="text"
//                          id="username"
//                          name="signupUsername"
//                          required
//                          value={signUpUsername}
//                          onChange={handleInputChange}
//                          className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                          />
//                         <label id='username-label' className={`absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='username'>Username</label>
//                     </div>
//                     <div className={`${getEmailLabelClass(signUpEmail)} w-[45%] mb-5 `}>
//                         <input 
//                          type="email"
//                          id="email"
//                          name="signupEmail"
//                          required
//                          value={signUpEmail}
//                          onChange={handleInputChange}
//                          className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                          />
//                         <label id='email-label' className={` absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='email'>Email</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)} w-[45%] mb-5 `}>
//                         <input 
//                          type="password"
//                          id="password"
//                          name="signupPassword"
//                          required
//                          value={signUpPassword}
//                          onChange={handleInputChange}
//                          className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                          />
//                         <label id='password-label' className={` absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='password'>Password</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)}  w-[45%] mb-10 `}>
//                         <input 
//                          type="password"
//                          id="confirmPassword"
//                          name="signupConfirmPassword"
//                          required
//                          value={signupConfirmPassword}
//                          onChange={handleInputChange}
//                          className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                          />
//                         <label id='confirm-password-label' className={`absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='confirmPassword'>Confirm Password</label>
//                     </div>
//                     <div className="flex justify-center align-center">
//                         <PageButton label="Start Learning" />
//                     </div>
//                         <div className="flex justify-center align-center">
//                         <p className="my-5 text-xl">Already have an account? <Link className="text-[#ff6b6b] border-[2px] border-[transparent] transition duration-[200ms] hover:border-b-[#ff6b6b]" href='/login'>Log in</Link>.</p>
//                     </div>
                    
//                 </div>
//             </form>
//         </div>
//     );
// }

// // page.js
// 'use client';

// import Navbar from "../components/Navbar";
// import PageButton from "../components/PageButton";
// import { useState } from "react";
// import Link from "next/link";
// import { signUp } from './authService';

// export default function SignUp() {
//     const [signUpUsername, setSignupUsername] = useState('');
//     const [signUpEmail, setSignupEmail] = useState('');
//     const [signUpPassword, setSignupPassword] = useState('');
//     const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'signupEmail') {
//             setSignupEmail(value);
//         } else if (name === 'signupUsername') {
//             setSignupUsername(value);
//         } else if (name === 'signupPassword') {
//             setSignupPassword(value);
//         } else if (name === 'signupConfirmPassword') {
//             setSignupConfirmPassword(value);
//         }
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         if (signUpPassword !== signupConfirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }
//         try {
//             await signUp(signUpEmail, signUpPassword);
//             setSuccess("User signed up successfully!");
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             setSuccess(null);
//         }
//     };

//     const getUsernameLabelClass = (inputValue) => {
//         return inputValue ? 'in-focus-valid' : '';
//     };

//     const getEmailLabelClass = (inputValue) => {
//         if (inputValue) {
//             if (inputValue.includes('@') && inputValue.includes('.')) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         } else {
//             return '';
//         }
//     };

//     const getPasswordLabelClass = (passVal, confirmPassVal) => {
//         if (passVal) {
//             if (passVal === confirmPassVal) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         }
//         return '';
//     };

//     return (
//         <div className="w-full">
//             <Navbar isHighlighted='signup' />
//             <div className="flex w-full justify-center text-8xl mb-4 mt-10">
//                 <h1 className="text-center">Sign</h1>
//                 <span className="mx-2"></span>
//                 <h1 className="text-[#FF6B6B]">Up</h1>
//             </div>
//             <form onSubmit={handleSignUp}>
//                 <div className="flex w-full flex-col items-center mt-10">
//                     <div className={`${getUsernameLabelClass(signUpUsername)} w-[45%] mb-5 `}>
//                         <input
//                             type="text"
//                             id="username"
//                             name="signupUsername"
//                             required
//                             value={signUpUsername}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='username-label' className={`absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='username'>Username</label>
//                     </div>
//                     <div className={`${getEmailLabelClass(signUpEmail)} w-[45%] mb-5 `}>
//                         <input
//                             type="email"
//                             id="email"
//                             name="signupEmail"
//                             required
//                             value={signUpEmail}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='email-label' className={` absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='email'>Email</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)} w-[45%] mb-5 `}>
//                         <input
//                             type="password"
//                             id="password"
//                             name="signupPassword"
//                             required
//                             value={signUpPassword}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='password-label' className={` absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='password'>Password</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)}  w-[45%] mb-10 `}>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="signupConfirmPassword"
//                             required
//                             value={signupConfirmPassword}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='confirm-password-label' className={`absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='confirmPassword'>Confirm Password</label>
//                     </div>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {success && <p style={{ color: 'green' }}>{success}</p>}
//                     <div className="flex justify-center align-center">
//                         <PageButton label="Start Learning" />
//                     </div>
//                     <div className="flex justify-center align-center">
//                         <p className="my-5 text-xl">Already have an account? <Link className="text-[#ff6b6b] border-[2px] border-[transparent] transition duration-[200ms] hover:border-b-[#ff6b6b]" href='/login'>Log in</Link>.</p>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }



//------after refactoring the auth ------------

// // page.js
// 'use client';

// import Navbar from "../components/Navbar";
// import PageButton from "../components/PageButton";
// import { useState } from "react";
// import Link from "next/link";
// import { signUp } from './authservice'; // Ensure the path is correct

// export default function SignUp() {
//     const [signUpUsername, setSignupUsername] = useState('');
//     const [signUpEmail, setSignupEmail] = useState('');
//     const [signUpPassword, setSignupPassword] = useState('');
//     const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'signupEmail') {
//             setSignupEmail(value);
//         } else if (name === 'signupUsername') {
//             setSignupUsername(value);
//         } else if (name === 'signupPassword') {
//             setSignupPassword(value);
//         } else if (name === 'signupConfirmPassword') {
//             setSignupConfirmPassword(value);
//         }
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         if (signUpPassword !== signupConfirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }
//         try {
//             await signUp(signUpEmail, signUpPassword);
//             setSuccess("User signed up successfully!");
//             setError(null);
//         } catch (error) {
//             setError(error.message);
//             setSuccess(null);
//         }
//     };

//     const getUsernameLabelClass = (inputValue) => {
//         return inputValue ? 'in-focus-valid' : '';
//     };

//     const getEmailLabelClass = (inputValue) => {
//         if (inputValue) {
//             if (inputValue.includes('@') && inputValue.includes('.')) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         } else {
//             return '';
//         }
//     };

//     const getPasswordLabelClass = (passVal, confirmPassVal) => {
//         if (passVal) {
//             if (passVal === confirmPassVal) {
//                 return 'in-focus-valid';
//             } else {
//                 return 'in-focus-invalid';
//             }
//         }
//         return '';
//     };

//     return (
//         <div className="w-full">
//             <Navbar isHighlighted='signup' />
//             <div className="flex w-full justify-center text-8xl mb-4 mt-10">
//                 <h1 className="text-center">Sign</h1>
//                 <span className="mx-2"></span>
//                 <h1 className="text-[#FF6B6B]">Up</h1>
//             </div>
//             <form onSubmit={handleSignUp}>
//                 <div className="flex w-full flex-col items-center mt-10">
//                     <div className={`${getUsernameLabelClass(signUpUsername)} w-[45%] mb-5 `}>
//                         <input
//                             type="text"
//                             id="username"
//                             name="signupUsername"
//                             required
//                             value={signUpUsername}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='username-label' className={`absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='username'>Username</label>
//                     </div>
//                     <div className={`${getEmailLabelClass(signUpEmail)} w-[45%] mb-5 `}>
//                         <input
//                             type="email"
//                             id="email"
//                             name="signupEmail"
//                             required
//                             value={signUpEmail}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='email-label' className={` absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='email'>Email</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)} w-[45%] mb-5 `}>
//                         <input
//                             type="password"
//                             id="password"
//                             name="signupPassword"
//                             required
//                             value={signUpPassword}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='password-label' className={` absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='password'>Password</label>
//                     </div>
//                     <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)}  w-[45%] mb-10 `}>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="signupConfirmPassword"
//                             required
//                             value={signupConfirmPassword}
//                             onChange={handleInputChange}
//                             className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
//                         />
//                         <label id='confirm-password-label' className={`absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='confirmPassword'>Confirm Password</label>
//                     </div>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {success && <p style={{ color: 'green' }}>{success}</p>}
//                     <div className="flex justify-center align-center">
//                         <PageButton label="Start Learning" />
//                     </div>
//                     <div className="flex justify-center align-center">
//                         <p className="my-5 text-xl">Already have an account? <Link className="text-[#ff6b6b] border-[2px] border-[transparent] transition duration-[200ms] hover:border-b-[#ff6b6b]" href='/login'>Log in</Link>.</p>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }


//---trying storing to the database -----------

// page.js
'use client';

import Navbar from "../components/Navbar";
import PageButton from "../components/PageButton";
import { useState } from "react";
import Link from "next/link";
import { signUp } from './authservice'; // Ensure the path is correct

export default function SignUp() {
    const [signUpUsername, setSignupUsername] = useState('');
    const [signUpEmail, setSignupEmail] = useState('');
    const [signUpPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'signupEmail') {
            setSignupEmail(value);
        } else if (name === 'signupUsername') {
            setSignupUsername(value);
        } else if (name === 'signupPassword') {
            setSignupPassword(value);
        } else if (name === 'signupConfirmPassword') {
            setSignupConfirmPassword(value);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (signUpPassword !== signupConfirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await signUp(signUpEmail, signUpPassword, signUpUsername);
            setSuccess("User signed up successfully!");
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    const getUsernameLabelClass = (inputValue) => {
        return inputValue ? 'in-focus-valid' : '';
    };

    const getEmailLabelClass = (inputValue) => {
        if (inputValue) {
            if (inputValue.includes('@') && inputValue.includes('.')) {
                return 'in-focus-valid';
            } else {
                return 'in-focus-invalid';
            }
        } else {
            return '';
        }
    };

    const getPasswordLabelClass = (passVal, confirmPassVal) => {
        if (passVal) {
            if (passVal === confirmPassVal) {
                return 'in-focus-valid';
            } else {
                return 'in-focus-invalid';
            }
        }
        return '';
    };

    return (
        <div className="w-full">
            <Navbar isHighlighted='signup' />
            <div className="flex w-full justify-center text-8xl mb-4 mt-10">
                <h1 className="text-center">Sign</h1>
                <span className="mx-2"></span>
                <h1 className="text-[#FF6B6B]">Up</h1>
            </div>
            <form onSubmit={handleSignUp}>
                <div className="flex w-full flex-col items-center mt-10">
                    <div className={`${getUsernameLabelClass(signUpUsername)} w-[45%] mb-5 `}>
                        <input
                            type="text"
                            id="username"
                            name="signupUsername"
                            required
                            value={signUpUsername}
                            onChange={handleInputChange}
                            className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='username-label' className={`absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='username'>Username</label>
                    </div>
                    <div className={`${getEmailLabelClass(signUpEmail)} w-[45%] mb-5 `}>
                        <input
                            type="email"
                            id="email"
                            name="signupEmail"
                            required
                            value={signUpEmail}
                            onChange={handleInputChange}
                            className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='email-label' className={` absolute transform ml-[5px] z-[-1] translate-y-[-40px] text-2xl`} htmlFor='email'>Email</label>
                    </div>
                    <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)} w-[45%] mb-5 `}>
                        <input
                            type="password"
                            id="password"
                            name="signupPassword"
                            required
                            value={signUpPassword}
                            onChange={handleInputChange}
                            className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='password-label' className={` absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='password'>Password</label>
                    </div>
                    <div className={`${getPasswordLabelClass(signUpPassword, signupConfirmPassword)}  w-[45%] mb-10 `}>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="signupConfirmPassword"
                            required
                            value={signupConfirmPassword}
                            onChange={handleInputChange}
                            className={`block w-full h-[50px] border-solid border-[2px] z-5 border-[transparent] border-b-[#FF6b6b] rounded-[2px] bg-[transparent] text-white text-2xl font-light px-[5px]`}
                        />
                        <label id='confirm-password-label' className={`absolute transform z-[-1] ml-[5px] translate-y-[-40px] text-2xl`} htmlFor='confirmPassword'>Confirm Password</label>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div className="flex justify-center align-center">
                        <PageButton label="Start Learning" />
                    </div>
                    <div className="flex justify-center align-center">
                        <p className="my-5 text-xl">Already have an account? <Link className="text-[#ff6b6b] border-[2px] border-[transparent] transition duration-[200ms] hover:border-b-[#ff6b6b]" href='/login'>Log in</Link>.</p>
                    </div>
                </div>
            </form>
        </div>
    );
}