import Link from "next/link"

export default function OthereBuuble({message,time,name,doc}:{message:string,time:number,name:string,doc:string}) {
    const date =new Date(+time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    return (
      <div className="w-full h-fit my-5  flex flex-col justify-end items-start px-10    "><div className="bg-gray-700/75 h-fit    overflow-hidden px-5 py-2 items-cente  flex-col rounded-lg rounded-bl-none align-middle max-w-xs w-fit  ">{doc?(<div className=" aspect-auto overflow-hidden mb-5 w-full h-full p-2 drop-shadow-xl bg-black rounded-xl"><img src={doc} alt="doc" className="object-cover"/><Link href={doc} rel='noopener  noreferrer' target="_blank" className="text-sm text-blue-200  decoration-solid hover:underline">See full</Link></div>):(<></>)}{message}</div><span className="text-[15px] text-gray-100">{date}<span className="text-gray-300 ml-2 text-[14px]">~~{name}</span></span></div>
    )
}
