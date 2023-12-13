import {  push, ref, serverTimestamp, } from 'firebase/database';
import { db } from './FirebaseConnect';
import { auth } from "@/lib/FirebaseConnect"

const messagesRef = ref(db, 'chat/messages');

async function writeUserData(doc: string|null|undefined,message:string) {
  const user = await  auth.currentUser?.displayName
  if(user){
  const data= {
    doc:doc,
    message: message,
    name:user,
    timestamp: serverTimestamp(),
   
  };
  push(messagesRef,data)}
  else[
    alert("Please sign in first")
  ]
}

      

export { writeUserData };
