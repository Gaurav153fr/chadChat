import UserSign from "./UserSign"
export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 bg-black/75 z-50 border-b-2 border-white h-20 items-center px-5 flex justify-between"><div><h1 className=" font-bold text-lg">CHAD 🗿 CHAT</h1></div><div><UserSign/></div></nav>
  )
}
