/* eslint-disable @next/next/no-img-element */
'use client';
import api from "@/token";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Content {
    id: number;
    title: string;
    description: string;
    hashtag: string;
    imageUrl: string;
}


export default function Main() {
    const [data, setData] = useState<Content[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await api.get('/contents');
            setData(res.data);
          }
          fetchData()
    }, []);

    return (
       <>{data.length>0 &&  <main className="bg-gradient-to-r grid grid-cols-2 h-[80vh] place-content-center px-32 from-background to-muted rounded-xl ">
        <article className=" py-2  gap-4">
          <button className="px-4 py-2 bg-secondary text-background rounded-3xl hover:bg-blue-600 flex items-center">
          {data[0].hashtag}
         </button> 
         <h1 className="text-4xl font-bold my-4  w-[60%] ">
         {data[0].title}
         </h1>
         <p className="text-xl  w-3/4">
            {data[0].description}
         </p>
          <button className="px-4 py-2 my-4 text-lg bg-primary text-background rounded-3xl hover:bg-blue-600 flex items-center">
            Start free today
           <span className=" rounded-full text-center bg-background text-[#fff] p-1 py-2 ml-2">
             <Image src="/arrwh.svg" width={16} height={16} alt="Arrow" className="ml-2 w-4 h-4" />
           </span>      
          </button>
         </article>
        <article className="flex justify-end">
           <div className="image-container">
             <img src={data[0].imageUrl} alt=""  />
           </div>
        </article>
       </main>}</>
    )
}