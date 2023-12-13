"use client";
import { useRef, useState, useEffect } from "react";
import { fileUpload } from "@/lib/Upload ";
import { writeUserData } from "@/lib/WriteData";
export default function Send() {
  const [img, setImg] = useState<any>();
  const [doc, setDoc] = useState<string|undefined|null>(null);

  const inp = useRef<HTMLInputElement>(null);
  const inpUpl = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleUpload = async() => {
    if (img !== undefined && img.length > 0) {
      const url = await fileUpload({ img: img[0] });
      return url // Assuming the Upload function takes a single file
    }
  };

  const handleClick = () => {
    if (inp.current?.value) {
     ;
     writeUserData(doc,inp.current.value)
      inp.current.value = "";
      (inpUpl.current!==null)?(inpUpl.current.value=''):console.log("jbj")
      setDoc(null)

    }
  };
  const handleDrop = () => {
  console.log("drop")
  };

  useEffect(() => {
    const uploadAndSetDoc = async () => {
      if (img !== undefined && img.length > 0) {
        const url = await handleUpload();
        setDoc(url);
      }
    };

    uploadAndSetDoc();
    
  }, [img]);

  return (
    
    <div onDrop={handleDrop} className="fixed bottom-0 flex w-full border-t-2 border-t-blue-600 bg-black/75 h-20 items-center justify-center bg-black-500/75">
      <div className="w-1/4 sm:w-fit bg-blue-700/80  overflow-hidden rounded-full "><input
      ref={inpUpl}
      id='file'
      
        type="file"
        placeholder="file"
        onChange={(e) => setImg(e.target.files)}
        className="file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:w-fit
        file:bg-white/20 file:text-white
        hover:file:bg-blue-800/50 "
      /></div>
      
      <div className="flex gap-2 md:w-1/2 w-full px-5 sm:justify-normal justify-between h-full py-3">
        <input
          ref={inp}
          className="text-black rounded-xl w-full p-2 sm:p-5 font-bold"
          placeholder="Type here to chat..."
          type="text"
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-700 rounded-xl sm:w-25 w-32 hover:bg-blue-600"
          type="button"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
}
