import axios, { AxiosError } from 'axios';
import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NoEvents from './NoEvent';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';


type Data = {
    content: string
    createdAt: string
    id: string
    image: string
    title: string
    writer: string
    eventdate: string
}


export default function Events() {

    const [loading, setLoading] = useState(true)
    const [list, setList] = useState<Data[]>([])


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

    const bg = (img: string) => {
        const url = `${process.env.NEXT_PUBLIC_URL}/${img}`.replace(/\\/g, '/'); 
        return url;
    };

    const carouselBasis = () => {
      if(list.length === 1){
        return 'basis-[100%]'
      } else if (list.length === 2){
        return 'basis-1/2'
      }else if (list.length === 3){
        return 'basis-1/3'
      }else {
        return 'basis-1/4'

      }
    }

    const formatDateDay = (data: string) => {
      const date = new Date(data)
      const getDay = date.getDay()

      return getDay
    }

    const formatDateMonth = (data: string): string => {
      const date = new Date(data);
  
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      const getMonth = date.getMonth(); // Returns 0-based month index
      return monthNames[getMonth]; // Get the month name based on the index
    };
    

    const formatDateYear = (data: string) => {
      const date = new Date(data)
      const getDay = date.getFullYear()

      return getDay
    }

      
  return (
   <>
 
    <div id='events' className=' w-full h-auto py-20 flex items-center justify-center px-4'>
        <div className=' w-full max-w-[1440px] flex flex-col items-center justify-center'>
            <h2 className=' text-3xl font-medium'>Events Calendar</h2>
            <p className=' text-sm'>Experience Our Vibrant School Community</p>

            {loading === true ? (
               <div className=' w-full h-[300px] flex items-center justify-center'>
                <span className='loader2'></span>
              </div>
            ): (
              <>
              <div className=' hidden md:block'>
                {list.length !== 1 && (
                  <Carousel className=' w-full mt-12'>
                  <CarouselContent>
                    {list.map((item, index) => (
                    <CarouselItem key={item.id} className={` ${carouselBasis()}`}>
                        <div  className=' w-full h-auto bg-zinc-50 rounded-sm flex flex-col'>
                                <div className=' relative w-full h-[400px] bg-zinc-50'
                                style={{
                                    backgroundImage: `url(${bg(item.image)})`, 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                >
                                  {/* <p className=' absolute top-2 right-2 bg-zinc-950 text-white px-3 py-1 rounded-full w-fit text-[.6rem]'>Upcoming</p> */}
                                </div>

                                <div className=' w-full h-auto flex  gap-2 text-xs'>
                                  <div className=' flex flex-col items-center justify-center gap-1 h-20 aspect-square bg-zinc-950 text-white p-2'>
                                    <p className=' text-lg font-semibold'>{formatDateDay(item.eventdate)}</p>
                                    <p className=' text-xs '>{formatDateMonth(item.eventdate)}</p>
                                    <p className=' text-xs'>{formatDateYear(item.eventdate)}</p>
                                  </div>

                                  <div className=' h-20 flex flex-col justify-center'>
                                    <p className=' cursor-pointer text-lg font-medium '>{item.title}</p>
                                    <p className=' text-zinc-500 text-xs'>Create by: {item.writer}</p>

                                  </div>
                                  
                                </div>

                        </div>
                    </CarouselItem>
                          
                    ))}   

                
                
                  
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  </Carousel>
                )}

                {list.length === 1 && (
                  <Carousel className=' max-w-[700px] w-full mt-12'>
                  <CarouselContent>
                    {list.map((item, index) => (
                    <CarouselItem key={item.id} className={` w-full max-w-[700px] `}>
                        <div  className=' w-full h-auto bg-zinc-50 rounded-sm flex flex-col'>
                                <div className=' relative w-full h-[400px] bg-zinc-50'
                                style={{
                                    backgroundImage: `url(${bg(item.image)})`, 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                >
                                  {/* <p className=' absolute top-2 right-2 bg-zinc-950 text-white px-3 py-1 rounded-full w-fit text-[.6rem]'>Upcoming</p> */}
                                </div>

                                <div className=' w-full h-auto flex  gap-2 text-xs'>
                                  <div className=' flex flex-col items-center justify-center gap-1 h-20 aspect-square bg-zinc-950 text-white p-2'>
                                    <p className=' text-lg font-semibold'>{formatDateDay(item.eventdate)}</p>
                                    <p className=' text-xs '>{formatDateMonth(item.eventdate)}</p>
                                    <p className=' text-xs'>{formatDateYear(item.eventdate)}</p>
                                  </div>

                                  <div className=' h-20 flex flex-col justify-center'>
                                    <p className=' cursor-pointer text-lg font-medium '>{item.title}</p>
                                    <p className=' text-zinc-500 text-xs'>Create by: {item.writer}</p>

                                  </div>
                                  
                                </div>

                        </div>
                    </CarouselItem>
                          
                    ))}   

                
                
                  
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  </Carousel>
                )}
              </div>

              <div className=' block md:hidden w-full mr-4'>
                  <Carousel className=' w-full mt-12'
                  opts={
                    {
                      loop: true
                    }
                  }
                  plugins={[
                    Autoplay({
                      delay: 2000
                    })
                  ]}
                  >
                  <CarouselContent>
                    {list.map((item, index) => (
                    <CarouselItem key={item.id} className={` w-full`}>
                        <div  className=' w-full h-auto bg-zinc-50 rounded-sm flex flex-col'>
                                <div className=' relative w-full h-[400px] bg-zinc-50'
                                style={{
                                    backgroundImage: `url(${bg(item.image)})`, 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                >
                                  {/* <p className=' absolute top-2 right-2 bg-zinc-950 text-white px-3 py-1 rounded-full w-fit text-[.6rem]'>Upcoming</p> */}
                                </div>

                                <div className=' w-full h-auto flex  gap-2 text-xs'>
                                  <div className=' flex flex-col items-center justify-center gap-1 h-20 aspect-square bg-zinc-950 text-white p-2'>
                                    <p className=' text-lg font-semibold'>{formatDateDay(item.eventdate)}</p>
                                    <p className=' text-xs '>{formatDateMonth(item.eventdate)}</p>
                                    <p className=' text-xs'>{formatDateYear(item.eventdate)}</p>
                                  </div>

                                  <div className=' h-20 flex flex-col justify-center'>
                                    <p className=' cursor-pointer text-lg font-medium '>{item.title}</p>
                                    <p className=' text-zinc-500 text-xs'>Create by: {item.writer}</p>

                                  </div>
                                  
                                </div>

                        </div>
                    </CarouselItem>
                          
                    ))}   
                  </CarouselContent>
                  
                  </Carousel>
                
              </div>
             
              
              </>
              
            )}
            

        </div>

        

    </div>
   
   </>
    
  )
}
