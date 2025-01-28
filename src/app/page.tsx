'use client'
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Homepage from "./homepage/Homepage";
import Programs from "./homepage/Programs";
import Facilities from "./homepage/Facilities";
import Events from "./homepage/Events";
import Footer from "./homepage/Footer";
import Announcements from "./homepage/Announcement";
import About from "./homepage/About";
import { ChatBox } from "@/components/support/CustomerSupport";


type Data = {
  content: string
createdAt: string
id: string
image: string
title: string
}

type News = {
  content: string
createdAt: string
id: string
image: string
title: string
writer: string

}


export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Data[]>([])
  const [news, setNews] = useState<News[]>([])


 useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(() => {
      const getList = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_URL}/event/getevents?page=0&limit=9999`,
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


useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
          const getList = async () => {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_URL}/announcement/getannouncement?page=0&limit=9999`,
                { withCredentials: true }
              );
              setNews(res.data.data.data)
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
  


  return (
    <div className=" font-serif overflow-x-hidden">
      <Homepage/>
      <About/>
      <Programs/>
      <Facilities/>
      {/* <WhyChooseUs/> */}
      {list.length !== 0 && <Events/>}
      {news.length !== 0 && <Announcements/>}
      <Footer/>

      <ChatBox/>
    </div>
    
  );
}
