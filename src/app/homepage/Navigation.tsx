'use client'
import { LogIn, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React from 'react'
import Marquee from "react-fast-marquee";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  

export default function Navigation() {
    const path = usePathname()

  return (
    <nav className=' sticky top-0 z-50 w-full flex flex-col items-center justify-center h-auto bg-white'>
        <div className=' w-full h-[50px] flex items-center justify-center bg-pink-950 text-white text-xs'>
            <Marquee className=''>
                <p className=' mr-24'>Latest News: SY 2025 Lorem ipsum is now open for applications on all program until March 5</p>
                {/* <p className=' mr-24'>Latest News: SY 2025 Lorem ipsum is now open for applications on all program until March 5</p>
                <p className=''>Latest News: SY 2025 Lorem ipsum is now open for applications on all program until March 5</p> */}
            </Marquee>
        </div>
        <div className=' w-full max-w-[1440px] flex items-center justify-between h-[80px] px-4'>
            <div className=' flex items-center gap-2'>
                <div className=' w-[50px] aspect-square rounded-full bg-black '>

                </div>
                <p>logo</p>
            </div>

            <Sheet>
            <SheetTrigger className=' lg:hidden flex'><Menu size={20}/></SheetTrigger>
            <SheetContent>
                <div className=' flex items-center gap-2'>
                    <div className=' w-[50px] aspect-square rounded-full bg-black '>

                    </div>
                    <p>logo</p>
                </div>

                <div className='flex flex-col gap-4 text-sm mt-8'>
                    <a href="/" className=' hover:text-pink-600'>Home</a>
                    <a href="/application" className={`' hover:text-pink-600' ${path.includes('/application') && 'text-pink-600'}`}>Application</a>
                    {/* <a href="" className=' hover:text-pink-600'>Enrollment</a> */}
                    {/* <a href="/#events" className=' hover:text-pink-600'>Events</a> */}
                    <a href="/#news" className={`' hover:text-pink-600' ${path.includes('/news') && 'text-pink-600'}`}>News</a>
                    <a href="/#about" className={`' hover:text-pink-600' ${path.includes('/about') && 'text-pink-600'}`}>About Us</a>

                    <a href='https://schoolportaldashboard.onrender.com/' className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium '>Enroll Now</a>


                </div>
            </SheetContent>
            </Sheet>


            <div className=' hidden lg:flex items-center gap-4 text-sm'>
                <a href="/" className=' hover:text-pink-600'>Home</a>
                <a href="/application" className={`' hover:text-pink-600' ${path.includes('/application') && 'text-pink-600'}`}>Application</a>
                {/* <a href="" className=' hover:text-pink-600'>Enrollment</a> */}
                {/* <a href="/#events" className=' hover:text-pink-600'>Events</a> */}
                <a href="/#news" className={`' hover:text-pink-600' ${path.includes('/news') && 'text-pink-600'}`}>News</a>
                <a href="/#about" className={`' hover:text-pink-600' ${path.includes('/about') && 'text-pink-600'}`}>About Us</a>

                <button className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium '>Enroll Now</button>


                {/* <a href="/applicationportal/signin" className='order-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium rounded-sm flex items-center gap-1'>Login <LogIn size={15}/></a> */}
            </div>
        </div>
</nav>
  )
}
