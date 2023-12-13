import Link from "next/link"

export default function UserBuble({message,time,doc}:{message:string,time:number,doc?:string}) {
    const date =new Date(+time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  return (
    <div className="w-full h-fit my-5  flex flex-col justify-end items-end sm:px-10 px-5    "><div className="bg-blue-500 h-fit    overflow-hidden px-5 py-2 items-cente  flex-col rounded-lg rounded-br-none align-middle max-w-xs w-fit  ">{doc?(<div className=" aspect-auto overflow-hidden mb-5 w-full h-full p-2 drop-shadow-xl bg-white/10 rounded-xl"><img src={doc} alt="doc" className="object-cover"/><Link href={doc} rel='noopener  noreferrer' target="_blank" className="text-sm text-blue-200  decoration-solid hover:underline">See full 📲</Link></div>):(<></>)}{message}</div><span className="text-[15px] text-gray-100">{date}</span></div>
  )
}
