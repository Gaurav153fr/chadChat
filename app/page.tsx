'use client'
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '@/lib/FirebaseConnect';
import { onValue, ref, DataSnapshot } from 'firebase/database';
import UserBubble from '@/components/UserBuuble';
import OthereBuuble from '@/components/OtherBubble';
import { User } from 'firebase/auth';

interface ChatMessage {
  doc: string;
  message: string;
  name: string;
  timestamp:number
  // Add other properties as needed
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log('User Authenticated:', userAuth);
        setUser(userAuth);
      } else {
        console.log('No User Authenticated');
        setUser(null);
      }
      setLoadingUser(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const messagesRef = ref(db, 'chat/messages');

    const onDataChanged = (snapshot: DataSnapshot) => {
      const data = snapshot.val();

      if (data) {
        const chatData: ChatMessage[] = Object.values(data);
        setChat(chatData);
        console.log(chatData)
      } else {
        setChat([]);
      }
    };

    const unsubscribe = onValue(messagesRef, onDataChanged);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="">
      {loadingUser ? (<div className='w-full mt-32 justify-center flex items-center'>
        <p className='bg-blue-800 px-2 py-1 rounded-full'>Loading...🔃</p></div> // Render a loading indicator while the user state is being fetched
      ) : (
        <>
          {chat.map((message, index) => (
            <div key={index}>
              {user && message.name === user.displayName ? (
                <UserBubble message={message.message} time={message.timestamp} doc={message.doc} />
              ) : (<>       <OthereBuuble message={message.message} time={message.timestamp} name={message.name} doc={message.doc} /></>

              )}
            </div>
          ))}
          <div className="mt-20" ref={messagesEndRef} />
        </>
      )}
    </main>
  );
}
