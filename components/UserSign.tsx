"use client";
import { auth } from "@/lib/FirebaseConnect";
import { signIn } from "@/lib/SignInWithGoogle";
import { User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
export default function UserSign() {
  const [user, setUser] = useState<User|null>(null);
  
const handleSignOut=()=>{
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});}

    const handleSignIn = () => {
        signIn();
      };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is logged in, update the display name in state
        setUser(userAuth); // Set the display name or a default value if not available
      } else {
        // No user is logged in, set the state accordingly
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <div>{user?
      (<><div className="bg-white/20 rounded-full  w-fit   flex px-2 my-1 sm:h-fit h-fit items-center">
        <div className=" rounded-full overflow-hidden sm:w-4 sm:h-4 w-8  bg-white"><img src={user.photoURL||"/profile"} className="   object-cover overflow-hidden h-fit" alt="profile image" /></div><span className="w-2 mx-2">|</span><span className="text-sm">{user.displayName}</span><span className="w-2 mx-2">|</span> <button onClick={handleSignOut} className="text-sm">LogOut 📴</button></div>
<p></p>
      </>):(<div ><div className="flex flex-col"><span>New here?</span><button type="button" className=" rounded-lg bg-blue-500 hover:bg-blue-400 p-2" onClick={handleSignIn}>Sign In</button></div></div>)}</div>
  );
}
