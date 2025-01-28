import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <div className=' w-full h-auto flex items-center justify-center bg-pink-950 text-white py-20 px-4'>
        <div className=' w-full h-full max-w-[1440px] flex items-center justify-center'>
            <div className='w-full flex flex-col gap-4 items-center text-xs'>
                <p className=' text-sm font-medium text-center'>Contact us</p>
                <h2 className=' text-4xl font-bold text-center'>We’d Love to Hear From You!</h2>
                <p className=' w-full max-w-[500px] text-center text-zinc-200'>Whether you have questions, need more information, or want to schedule a visit, our team is here to help.</p>

                <button className='border-[1px] border-pink-600 text-white bg-pink-600 px-6 py-2 text-sm font-medium rounded-sm flex items-center gap-2 mt-6'><Mail size={15}/>Send us a message</button>

                <hr className=' border-pink-900  w-full my-6'/>

                <div className=' w-full flex flex-col'>

                    <div className=' w-full flex lg:flex-row flex-col gap-8 justify-between'>
                        <div className=' flex items-center gap-2 text-sm'>
                            <a href="/" className=' hover:text-pink-600'>Home</a>
                            <a href="/application" className=' hover:text-pink-600'>Application</a>
                            <a href="" className=' hover:text-pink-600'>Enrollment</a>
                            <a href="#events" className=' hover:text-pink-600'>Events</a>
                            <a href="#news" className=' hover:text-pink-600'>News</a>
                            <a href="#about" className=' hover:text-pink-600'>About</a>
                        </div>

                        <div className=' flex items-center gap-2'>
                            <p>Follow us:</p>
                            <Facebook size={20} className=' text-pink-600'/>
                            <Instagram size={20} className=' text-pink-600'/>
                            <Twitter size={20} className=' text-pink-600'/>
                            <Youtube size={20} className=' text-pink-600'/>
                        </div>
                    </div>

                    <p className=' text-zinc-400 mt-12'>© [Year] [Your School Name]. All Rights Reserved.</p>
                    
                </div>

                 

                

            </div>

            {/* <div className=' flex items-center gap-2 text-xs'>
                <a href="" className=' hover:text-blue-600'>Home</a>
                <a href="" className=' hover:text-blue-600'>Application</a>
                <a href="" className=' hover:text-blue-600'>Enrollment</a>
                <a href="" className=' hover:text-blue-600'>News</a>
                <a href="" className=' hover:text-blue-600'>Announcement</a>
                <a href="" className=' hover:text-blue-600'>About</a>
            </div> */}


        </div>

    </div>
  )
}
