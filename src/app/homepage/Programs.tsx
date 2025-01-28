import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Program = {
    enddate: string
program: {name: string, status: string}
startdate: string
_id: string
}

export default function () {
    const router = useRouter()
    const [list, setList] = useState<Program[]>([])

    const apply = () => {
        router.push('/application')
    }

    useEffect(() => {
        const getList = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/program/getallprogramsenrollmentschedule`)

            console.log(response.data)
            setList(response.data.data)
        }
        getList()
    },[])

    const formatDateRange = (start: string, end: string): string => {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
      
        const startDate = new Date(start);
        const endDate = new Date(end);
      
        const startMonth = months[startDate.getMonth()];
        const startDay = startDate.getDate();
        const startYear = startDate.getFullYear();
      
        const endMonth = months[endDate.getMonth()];
        const endDay = endDate.getDate();
        const endYear = endDate.getFullYear();
      
        if (startYear === endYear) {
          // Same year
          if (startMonth === endMonth) {
            // Same month
            return `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
          } else {
            // Different months
            return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
          }
        } else {
          // Different years
          return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
        }
    };
      
      
  return (
    <div className=' w-full h-auto py-20 flex items-center justify-center px-4'>
        <div className=' w-full max-w-[1440px] flex flex-col items-center justify-center'>
            <h2 className=' text-3xl font-medium'>Programs We Offer</h2>
            <p className=' text-sm'>Explore Our Holistic Curriculum:</p>

            <div className=' w-full grid grid-cols-1 lg:grid-cols-4 gap-4 mt-12'>

                {list.map((item, index) => (
                   <div key={item._id} className=' relative flex flex-col items-end justify-end w-full h-[400px] bg-zinc-100 p-6'>

                        <div className=' absolute top-4 right-4 w-full flex items-end justify-end'>
                            <p className=' bg-white text-[.6rem] px-3 py-1 rounded-full text-red-500'>{formatDateRange(item.startdate, item.enddate)}</p>
                        </div>
                        <div className=' w-full flex items-center justify-between'>
                            <p className=' text-sm font-medium'>{item.program.name}</p>
                            <button onClick={apply} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium'>Apply Now</button>
                        </div>

                        
                    </div> 
                ))}

                <div className=' relative flex flex-col items-end justify-end w-full h-[400px] bg-zinc-100 p-6'>

                    {/* <div className=' absolute top-4 right-4 w-full flex items-end justify-end'>
                        <p className=' bg-white text-[.6rem] px-3 py-1 rounded-full text-red-500'>Ends in March 20</p>
                    </div> */}
                    <div className=' w-full flex items-center justify-between'>
                        <p className=' text-sm font-medium'>Nursery</p>
                        <button onClick={apply} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium'>Apply Now</button>


                    </div>

                    
                </div>

                <div className=' relative flex flex-col items-end justify-end w-full h-[400px] bg-zinc-100 p-6'>
                    {/* <div className=' absolute top-4 right-4 w-full flex items-end justify-end'>
                        <p className=' bg-white text-[.6rem] px-3 py-1 rounded-full text-red-500'>Ends in March 20</p>
                    </div> */}

                    <div className=' w-full flex items-center justify-between'>
                        <p className=' text-sm font-medium'>Elementary</p>
                        <button onClick={apply} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium'>Apply Now</button>
                    </div>
                    
                </div>

                <div className=' relative flex flex-col items-end justify-end w-full h-[400px] bg-zinc-100 p-6'>

                    {/* <div className=' absolute top-4 right-4 w-full flex items-end justify-end'>
                        <p className=' bg-white text-[.6rem] px-3 py-1 rounded-full text-red-500'>Ends in March 20</p>
                    </div> */}
                    <div className=' w-full flex items-center justify-between'>
                        <p className=' text-sm font-medium'>Jr. Highschool</p>
                        <button onClick={apply} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium'>Apply Now</button>
                    </div>
                    
                </div>

                <div className=' relative flex flex-col items-end justify-end w-full h-[400px] bg-zinc-100 p-6'>
                    {/* <div className=' absolute top-4 right-4 w-full flex items-end justify-end'>
                        <p className=' bg-white text-[.6rem] px-3 py-1 rounded-full text-red-500'>Ends in March 20</p>
                    </div> */}
                    <div className=' w-full flex items-center justify-between'>
                        <p className=' text-sm font-medium'>Sr. Highschool</p>
                        <button onClick={apply} className=' border-[1px] border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium'>Apply Now</button>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
  )
}
