// authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";


// const signUp = (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

const signUp = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {//storing
    uid: user.uid,
    email: user.email,
    username: username,
    createdAt: new Date()
  });
  //first logout the user to ensure they login to come back
  await signOut(auth);
  return user;
  
} 

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

export { signUp, signIn, logOut };