import {auth} from "./FirebaseConnect";
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth"

const provider = new GoogleAuthProvider()
const signIn = () =>{
    signInWithPopup(auth,provider).then((result)=>{
        const user= result.user
        console.log(user)
        return user
    }).catch((error) =>{
        console.log("Failed to sign in",error)
        return "user.email?.toString()"

    }
    )
}

export  {signIn}

