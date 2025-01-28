"use client"
import axios, { AxiosError } from 'axios'
import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Data = {
    content: string
createdAt: string
id: string
image: string
title: string
writer: string

}

export default function Announcements() {
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

      console.log(list.length)


  return (
    <div id='news' className=' w-full h-auto py-20 flex items-center justify-center px-4'>
        <div className=' w-full max-w-[1440px] flex flex-col items-center justify-center'>
            <h2 className=' text-3xl font-medium'>News</h2>
            <p className=' text-sm'>Experience Our Vibrant School Community</p>

            {loading === true ? (
               <div className=' w-full h-[300px] flex items-center justify-center'>
                <span className='loader2'></span>
              </div>
            ): (
              <>

              <div className='  w-full lg:flex flex-col items-center hidden'>
                {list.length >= 3 && (
                  <>
                  <div className=' w-full grid grid-cols-[1fr_400px] gap-4 mt-12'>
                    <div className=' w-full h-auto bg-zinc-50 flex flex-col'>
                        <div className=' w-full aspect-video bg-zinc-100'
                        style={{
                            backgroundImage: `url(${bg(list[0]?.image)})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >

                        </div>

                        <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                            <a href={`/news/${list[0]?.title}`} className=' text-lg font-medium underline'>{list[0]?.title}</a>
                            <p className=' text-zinc-500 text-xs'>Published by: {list[0]?.writer}</p>
                        </div>

                    </div>

                    <div className=' flex flex-col gap-4 w-full'>


                            <div className=' w-full h-full bg-zinc-100 flex flex-col'>
                                <div className=' w-full aspect-video bg-zinc-100'
                                style={{
                                    backgroundImage: `url(${bg(list[1]?.image)})`, // Calls your `bg` function
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                >
                                    

                                </div>

                                <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                                    {/* <p className=' flex items-center gap-1 text-pink-500 text-[.6rem]'><MapPin size={12}/>December 15, 2024</p> */}
                                    <a href={`/news/${list[1]?.title}`} className=' text-lg font-medium underline'>{list[1]?.title}</a>
                                    <p className=' text-zinc-500 text-xs'>Published by: {list[1]?.writer}</p>

                                    {/* <p className=' text-zinc-500 whitespace-pre-line'>{list[1]?.content.slice(0,100)} ...</p> */}
                                </div>

                            </div>

                            <div className=' w-full h-full bg-zinc-100 flex flex-col'>
                                <div className=' w-full aspect-video bg-zinc-100'
                                    style={{
                                        backgroundImage: `url(${bg(list[2]?.image)})`, // Calls your `bg` function
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >

                                </div>

                                <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                                    {/* <p className=' flex items-center gap-1 text-pink-500 text-[.6rem]'><MapPin size={12}/>December 15, 2024</p> */}
                                    <a href={`/news/${list[2]?.title}`} className=' text-lg font-medium underline'>{list[2]?.title}</a>
                                    <p className=' text-zinc-500 text-xs'>Published by: {list[2]?.writer}</p>
                                    {/* <p className=' text-zinc-500 whitespace-pre-line'>{list[2]?.content.slice(0,100)} ...</p> */}
                                </div>

                            </div>
                      
                        
                    </div>


                    </div>

                    <a href='/news' className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium w-fit mt-8'>See more</a>
                  </>
                )}

                {list.length === 2 && (
                  <>
                  <div className=' w-full grid grid-cols-2 gap-4 mt-12'>
                    <div className=' w-full h-auto bg-zinc-50 flex flex-col'>
                        <div className=' w-full aspect-video bg-zinc-100'
                        style={{
                            backgroundImage: `url(${bg(list[0]?.image)})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >

                        </div>

                        <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                            <a href={`/news/${list[0]?.title}`} className=' text-lg font-medium underline'>{list[0]?.title}</a>
                            <p className=' text-zinc-500 text-xs'>Published by: {list[0]?.writer}</p>
                        </div>

                    </div>

                    <div className=' w-full h-auto bg-zinc-50 flex flex-col'>
                        <div className=' w-full aspect-video bg-zinc-100'
                        style={{
                            backgroundImage: `url(${bg(list[1]?.image)})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >

                        </div>

                        <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                            <a href={`/news/${list[0]?.title}`} className=' text-lg font-medium underline'>{list[1]?.title}</a>
                            <p className=' text-zinc-500 text-xs'>Published by: {list[1]?.writer}</p>
                        </div>

                    </div>
                    </div>
                  </>
                )}

                {list.length === 1 && (
                  <>
                  <div className=' w-full flex items-center justify-center gap-4 mt-12'>
                    <div className=' w-full max-w-[700px] h-auto bg-zinc-50 flex flex-col'>
                        <div className=' w-full aspect-video bg-zinc-100'
                        style={{
                            backgroundImage: `url(${bg(list[0]?.image)})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >

                        </div>

                        <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                            <a href={`/news/${list[0]?.title}`} className=' text-lg font-medium underline'>{list[0]?.title}</a>
                            <p className=' text-zinc-500 text-xs'>Published by: {list[0]?.writer}</p>
                        </div>

                    </div>
                  </div>

                  </>
                )}
              </div>

              <div className=' w-full flex flex-col gap-8 lg:hidden '>

                <div className=' w-full grid grid-cols-1 gap-4 mt-12'>
                    <div className=' w-full h-auto bg-zinc-50 flex flex-col'>
                        <div className=' w-full aspect-video bg-zinc-100'
                        style={{
                            backgroundImage: `url(${bg(list[0]?.image)})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        >

                        </div>

                        <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                            <a href={`/news/${list[0]?.title}`} className=' text-lg font-medium underline'>{list[0]?.title}</a>
                            <p className=' text-zinc-500 text-xs'>Published by: {list[0]?.writer}</p>
                        </div>

                    </div>

                    <div className=' flex flex-col gap-4 w-full'>


                            <div className=' w-full h-full bg-zinc-100 flex flex-col'>
                                <div className=' w-full aspect-video bg-zinc-100'
                                style={{
                                    backgroundImage: `url(${bg(list[1]?.image)})`, // Calls your `bg` function
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                >
                                    

                                </div>

                                <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                                    {/* <p className=' flex items-center gap-1 text-pink-500 text-[.6rem]'><MapPin size={12}/>December 15, 2024</p> */}
                                    <a href={`/news/${list[1]?.title}`} className=' text-lg font-medium underline'>{list[1]?.title}</a>
                                    <p className=' text-zinc-500 text-xs'>Published by: {list[1]?.writer}</p>

                                    {/* <p className=' text-zinc-500 whitespace-pre-line'>{list[1]?.content.slice(0,100)} ...</p> */}
                                </div>

                            </div>

                            <div className=' w-full h-full bg-zinc-100 flex flex-col'>
                                <div className=' w-full aspect-video bg-zinc-100'
                                    style={{
                                        backgroundImage: `url(${bg(list[2]?.image)})`, // Calls your `bg` function
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >

                                </div>

                                <div className=' w-full h-full flex flex-col gap-2 p-4 text-xs'>
                                    {/* <p className=' flex items-center gap-1 text-pink-500 text-[.6rem]'><MapPin size={12}/>December 15, 2024</p> */}
                                    <a href={`/news/${list[2]?.title}`} className=' text-lg font-medium underline'>{list[2]?.title}</a>
                                    <p className=' text-zinc-500 text-xs'>Published by: {list[2]?.writer}</p>
                                    {/* <p className=' text-zinc-500 whitespace-pre-line'>{list[2]?.content.slice(0,100)} ...</p> */}
                                </div>

                            </div>
                      
                        
                    </div>


                </div>
                {list.length >= 3 && (
                
                  <a href='/news' className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium w-fit'>See more</a>
                  
                )}

               
              </div>
              
              
              </>
              
            )}

            

        </div>

        

    </div>
  )
}
