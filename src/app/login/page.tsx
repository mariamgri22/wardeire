/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { getUser } from "@/lib/redux/authSlice";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("signin");
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

  const handleLoginSuccess =async () => {
    if(Cookies.get("bearerToken")){
        dispatch(getUser())
    }  
  };
  
  return (
    <div className="container m-auto text-primary p-3 overflow-hidden font-[family-name:var(--font-geist-sans)]">
        <header className="py-4">
            <nav>
                <Link href="/" className=" hover:text-blue-500">Back</Link>
            </nav>

        </header>
        <div className="flex items-center justify-center h-[80vh] place-content-center px-32 bg-gradient-to-r from-background to-muted rounded-xl text-white">
        {user ? ( <div>
        
        <p>Hi {user?.username}</p>
        </div>) :
     ( <div className="w-96 p-6 bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex justify-around mb-6 border-b border-gray-700">
          <button
            className={`w-1/2 py-2 text-lg font-medium transition-colors ${
              activeTab === "signin" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-medium transition-colors ${
              activeTab === "signup" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "signin" ? (
          <Login onLoginSuccess={handleLoginSuccess}/>
        ) : (
          <Register onRegisterSuccess={function (): void {
                          throw new Error("Function not implemented.");
                      } }/>
        )}
      </div>)}
     
    </div>
    </div>
  );
}
