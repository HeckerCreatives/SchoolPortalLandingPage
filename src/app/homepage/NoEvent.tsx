import axios, { AxiosError } from 'axios';
import { MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'




export default function NoEvents() {

 

  return (
    <div className=' w-full h-auto py-20 flex items-center justify-center'>
        <div className=' w-full max-w-[1440px] flex flex-col items-center justify-center'>
            <h2 className=' text-3xl font-medium'>Upcoming Events</h2>
            <p className=' text-sm'>Stay Tuned! There are currently no events scheduled at the moment.</p>

            <div className=' w-full grid grid-cols-2 gap-4 mt-12'>

                <div className=' w-full aspect-video'
                style={{
                    backgroundImage: `url(/event.jpg)`, // Calls your `bg` function
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                </div>

                <div className=' w-full'>
                    <h2 className=' text-2xl'>We’re always planning exciting activities, workshops, and celebrations for our school community. Check back soon for updates on upcoming events!</h2>
                </div>

               

            </div>
        </div>

        

    </div>
  )
}
