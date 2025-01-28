'use client'
import React, { useEffect, useState } from 'react'
import Navigation from '../homepage/Navigation'
import Footer from '../homepage/Footer'
import axios, { AxiosError } from 'axios'

type Data = {
  content: string
createdAt: string
id: string
image: string
title: string
}

export default function page() {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Data[]>([])


  useEffect(() => {
      setLoading(true)
      const timeoutId = setTimeout(() => {
        const getList = async () => {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_URL}/announcement/getannouncement?page=0&limit=9999`,
              { withCredentials: true }
            );
            console.log(res.data)
            setList(res.data.data.data)
          setLoading(false)

          } catch (error) {
          setLoading(false)
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string; data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
          
              }
            }
          }
        };
  
        getList();
      }, 500); 

      return () => clearTimeout(timeoutId);
  }, []);

  const bg = (img: string) => {
      const url = `${process.env.NEXT_PUBLIC_URL}/${img}`.replace(/\\/g, '/'); 
      return url;
    };

    
  return (
    <div className=" relative h-auto md:h-screen w-full bg-white flex flex-col overflow-x-hidden overflow-y-auto">
      <Navigation/>
      <div className=" h-auto w-full flex flex-col items-center justify-center gap-4 py-20">
        <h2 className=' text-2xl font-medium font-serif'>News</h2>

        
        {loading === true ? (

          <div className=' w-full h-[300px] flex items-center justify-center'>
            <span className='loader2'></span>
          </div>
          ): (
          <div className=' w-full max-w-[1240px] grid grid-cols-4 gap-4 mt-12'>
            {list.map((item, index) => (
               <div key={index} className=' w-full h-full bg-zinc-100 flex flex-col'>
                  <div className=' w-full aspect-video bg-pink-100'
                  style={{
                    backgroundImage: `url(${bg(item?.image)})`, // Calls your `bg` function
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  >
                  </div>
  
                  <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                    <p className=' text-lg font-medium underline font-serif'>{item?.title}</p>
                    <p className=' text-zinc-500 text-xs'>Lorem Ipsum School</p>
                    <a href={`/news/${item.title}`} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-3 py-1 text-[.6rem] font-medium w-fit mt-4'>Read more</a>
  
                  </div>
  
              </div>
            ))}
          
          </div>
        )}


       
      </div>
      <Footer/>
    </div>
  )
}
