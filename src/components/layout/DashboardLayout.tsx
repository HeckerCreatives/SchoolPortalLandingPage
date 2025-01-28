import { LogIn } from 'lucide-react';
import React, { cache, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ChatBox } from './CustomerSupport';
  
type Info = {
    _id: string
    username:  string  
    fullname: string 
}

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const router = useRouter()
    const [info, setInfo] = useState<Info[]>([])

    const logout = async () => {
        try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/logout`,{
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json'
            }
        })

        if(response.data.message === 'success'){
            router.push('/')
            toast.success('Logged out')
          }


        } catch (error) {

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`)     
                }

                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`)     
                        
                }

                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`)          
                            
                }

                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`)              
                    
                }

                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`)             
                }
        } 
            
        }

  }

  useEffect(() => {
    const getInfo = cache(async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/ticketuser/getticketuserinfo`,{
            withCredentials: true
            })
           console.log('Info',response.data)
           setInfo(response.data.data)
        
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`)     
                }
          
                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`)     
                        
                }
          
                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`)          
                            
                }
          
                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`)              
                    
                }
          
                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`)             
                }
          } 
        }
        
    })

    getInfo()
  },[])
  
  return (
    <div className=' h-screen w-full bg-white flex flex-col text-blue-950'>
        <nav className=" w-full h-[80px] flex items-center justify-center gap-2 px-4">
            <div className=" w-full max-w-[1240px] flex items-center justify-between">
            <div className=" flex items-center gap-2">
                <div className=" w-12 aspect-square rounded-full bg-zinc-200">

                </div>
                <p className=" text-sm">Logo</p>
            </div>

            <div className=" flex items-center gap-4 text-xs text-white">
            
                <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className=" flex items-center  gap-2 text-xs text-zinc-400">
                        <div className=" flex flex-col items-end gap-1">
                            <p className=' font-medium text-black'>{info[0]?.fullname}</p>
                            <p>{info[0]?.username}</p>
                        </div>
                        <div className=" w-10 aspect-square rounded-full bg-zinc-200">
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuLabel className=' text-xs'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=' text-xs flex items-center gap-2'><a href='/dashboard' className=' flex items-center gap-2'>Dashboard</a></DropdownMenuItem>
                    <DropdownMenuItem className=' text-xs flex items-center gap-2'><button onClick={logout} className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                 
                 
                </DropdownMenuContent>
                </DropdownMenu>


                {/* <a href="/" className=" flex items-center gap-1 bg-blue-600 px-4 py-2 rounded-md">Logout <LogIn size={15}/></a> */}


            </div>
            </div>
            
        
        </nav>

        <main className=' h-full w-full'>
            {children}
        </main>

        <ChatBox/>
    </div>
  )
}
