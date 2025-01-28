'use client'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Navigation from '@/app/homepage/Navigation'
import Footer from '@/app/homepage/Footer'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'

type Data = {
  content: string
  createdAt: string
  id: string
  image: string
  title: string
  writer: string
}


export default function page() {

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Data[]>([])
  const [slug, setSlug] = useState('')

  const searchParams = useSearchParams();
  const title = searchParams.get('id')

  const findList = list.find((item) => item.title === title)
  console.log(slug, findList)



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

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
    
      const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
    
      return date.toLocaleDateString("en-US", options); // Example output: "December 2, 2024"
    };
    

    
  return (
    <div className=" relative h-auto md:h-screen w-full bg-white flex flex-col overflow-x-hidden overflow-y-auto font-serif">
      <Navigation/>
      <div className=" h-auto w-full flex flex-col items-center justify-center gap-4 py-20 px-4">

        <div className=' w-full max-w-[1240px] flex flex-col gap-4'>
          <Breadcrumb slug={decodeURIComponent(slug)}/>

          <h2 className=' text-2xl font-semibold'>{findList?.title}</h2>

          <div className=' w-full flex items-center gap-2 text-sm text-zinc-500'>
            <p className=' '>{formatDate(findList?.createdAt || '')} </p>
            <p>-</p>
            <p className=''>Published by: <span className=' text-pink-600'>{findList?.writer}</span></p>

          </div>

          {loading === true ? (

            <div className=' w-full h-[300px] flex items-center justify-center'>
              <span className='loader2'></span>
            </div>
          ): (
            <div className=' w-full flex flex-col gap-8'>
              <div className=' w-full text-sm'>
                <p className=' whitespace-pre-wrap'>{findList?.content}</p>
              </div>

              <div className=' w-full'>
                <img src={`${bg(findList?.image || '')}`} alt="" />

              </div>

            </div>
          )}
         

        </div>

       
      </div>
      <Footer/>
    </div>
  )
}
