import { LogIn } from 'lucide-react'
import React from 'react'
import Navigation from './Navigation'

export default function Homepage() {
  return (
    <div id='home' className=' relative flex flex-col w-full h-[100vh] overflow-hidden'>
        <Navigation/>
        <video
        autoPlay
        muted
        loop
        className=' absolute h-full lg:h-auto lg:w-full  object-cover'
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className=' absolute w-full h-full bg-zinc-950/80'>

      </div>

      <div className=' flex flex-col items-center justify-center w-full h-full absolute z-20 text-white'>

        <div className=' flex flex-col gap-4 items-center justify-center w-[80%] lg:w-[60%] hover:bg-none'>
            <h1 className=' text-4xl lg:text-6xl w-full lg:w-[70%] text-center'>Unlock Your Child’s Full Potential at lorem ipsum</h1>
            <p className=' max-w-[600px] text-center text-zinc-100'>Providing Excellence in Education, Innovation, and Character Development for the Leaders of Tomorrow.</p>

            <div className=' w-full flex items-center justify-center gap-4 mt-8'>
                <a href='https://schoolportaldashboard.onrender.com/' className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium '>Enroll Now</a>
                <a href='/application' className='border-[1px] border-pink-600 text-white px-6 py-2 text-sm font-medium '>Apply Now</a>
            </div>
           
        </div>
      </div>
    </div>
  )
}
