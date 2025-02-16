'use client'

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getUser } from "@/lib/redux/authSlice";

export default function Header() {
    const user= useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          if(Cookies.get("bearerToken")){
              dispatch(getUser())
          }   
        } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error))
      }
      };
  
      fetchProfileData();
    }, []);
  

    return (
     <header className="flex items-center justify-between p-4 py-8 shadow-md">
      <div className="w-1/3 flex items-center gap-2">
       <Image src="/logo.svg" alt="Logo" width={30} height={20} />
       <span className=" font-bold text-2xl ">Wardiere Inc.</span>
      </div>
      
      <nav className="w-1/3 flex justify-center  items-center gap-6">
      <Link href="/solutions" className=" hover:text-blue-500">Solutions</Link>
        <Link href="/pricing" className=" hover:text-blue-500">Pricing</Link>
        <Link href="/about" className=" hover:text-blue-500">About</Link>
      </nav>

      <div className="w-1/3 flex  justify-end gap-3 text-lg">
      <Link href="/login">

         {user ? <div>Hi {user?.username}</div>: 
            <button className="px-4 py-2 bg-primary text-background rounded-3xl hover:bg-blue-600 flex items-center">
              Sign Up
            <Image src="/arrow.svg" width={16} height={16} alt="Arrow" className="ml-2 w-4 h-4" />

         </button>
        } 
      </Link>

     </div>


    </header>
    )
}