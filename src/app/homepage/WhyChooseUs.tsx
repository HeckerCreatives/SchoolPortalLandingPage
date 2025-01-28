import React from 'react'

export default function WhyChooseUs() {
  return (
    <div className=' w-full h-auto py-20 flex items-center justify-center'>
        <div className=' w-full max-w-[1440px] flex flex-col items-center justify-center'>

            <div className=' relative w-full h-[700px] flex flex-col items-center justify-center gap-4'>
                <h2 className=' text-4xl font-medium max-w-[500px] text-center'>Why Families Choose lorem ipsum</h2>

                <div className=' absolute left-12 top-12 flex flex-col items-end justify-end w-[400px] h-[200px] bg-blue-50 rounded-sm -rotate-12 p-6'>
                    <div className=' w-full'>
                        <p className=' text-sm font-medium'>Experienced Faculty</p>
                    </div>
                </div>

                <div className=' absolute right-12 top-12 flex flex-col items-end justify-end w-[400px] h-[200px] bg-blue-50 rounded-sm rotate-12 p-6'>
                    <div className=' w-full'>
                        <p className=' text-sm font-medium'>Experienced Faculty</p>
                    </div>
                </div>

            </div>

           

           
        </div>

    </div>
  )
}
