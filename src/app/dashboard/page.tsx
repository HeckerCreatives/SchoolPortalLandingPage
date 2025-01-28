'use client'
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatDate } from "@/hooks/helper";
import axios, { AxiosError } from "axios";
import { Calendar, CalendarCheck, Check, ChevronLeft, ChevronRight, CircleAlert, CircleHelp, Copy, File, FileCheck, FileText, FileUser, ImageUp, LogIn, Phone, RotateCw, UserRound, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Steps = [
  {name: 'Personal', icon: <File size={18}/>},
  {name: 'Calendar', icon: <Calendar size={18}/>},
  {name: 'File', icon: <CalendarCheck size={18}/>},
  {name: 'File', icon: <FileCheck size={18}/>},
]

type Status = {
  denyreason: string
id: string
status: string
hasSchedule: boolean
}

type Schedule = {
  id: string
  starttime:string
  endtime:string
  date: string
}

type Exam = {
  id:  string
  status: string
  score: number
}

type Sched = {
  _id: string
  username: string
  examstart: string
  examend: string
  date: string
  fullname: string
}

type Credentials = {
  username: string
  password: string
}

export default function Home() {
  const [currentStep, setCurrentstep] = useState(0)
  const [doc1, setDoc1] = useState('')
  const [status, setStatus] = useState('Approved') //On Progress, Approved, Rejected
  const [exam, setExam] = useState('Passed')
  const [getStatus, setGetStatus] = useState<Status>()
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [hasScheduel, setHasschedule] = useState(false)
  const [examresults, setExamresults] = useState<Exam>()
  const [sched, setSched] = useState<Sched[]>([])
  const [credentials, setCredentials] = useState<Credentials>()


  const note = () => {
    if(getStatus?.status === 'pending'){
      return 'Your application is currently under review. Please wait while we process it.'
    } else if (getStatus?.status === 'approved'){
      return 'Congratulations! Your application has been approved.'
    } else {
      return 'Unfortunately, your application was not approved. Please contact support for more information or next steps.'
    }
  }

  const statusIcon = () => {
    if(getStatus?.status === 'pending'){
      return <CircleAlert size={25} className=" text-blue-500"/>
    } else if (getStatus?.status === 'approved'){
      return <Check size={25} className=" text-green-500"/>
    } else {
      return <X size={25} className="  text-red-500"/>
    }
  }

  const examNote = () => {
    if(exam === 'Passed'){
      return 'Congratulations on passing the exam! Your hard work has paid off. Keep striving for excellence!. You may now log in to the enrollment portal, please use the creadentials above.'
    } else {
       return 'Don’t be discouraged by this setback. Reflect on the experience, keep learning, and come back stronger next time.'
    }
  }

  useEffect(() => {
    const getStatus = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/requirement/viewrequirementsstatus`,{
            withCredentials: true
            })
           console.log(res.data)
           setGetStatus(res.data.data)
           setHasschedule(res.data.data.hasSchedule)
           
        } catch (error) {
           
        }
        
    }

    getStatus()
  },[])

  useEffect(() => {
    const getList = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/examschedule/getexamschedule`,{
            withCredentials: true
            })
           console.log(response.data)
           setSchedule(response.data.data.data)
         
        } catch (error) {
           
        }
        
    }

    getList()
  },[])

  useEffect(() => {
    if(examresults?.status === 'failed' || examresults?.status === 'passed'  ){
      setCurrentstep(3)
    }
    else if(hasScheduel === true && (examresults?.status === 'pending' || examresults === undefined)){
      setCurrentstep(2)
    } else{
      setCurrentstep(0)
    }
  },[hasScheduel, examresults])

  // useEffect(() => {
  //   if(examresults?.status !== 'pending' && examresults?.status !== ''){
  //     setCurrentstep(3)
  //   } 
  // },[examresults])

  const [selectedIndex, setSelectedIndex] = useState<string>(''); // Track selected checkbox index

  const handleCheckboxChange = (index: string) => {
    setSelectedIndex(index); 
  };

  const submitSchedule = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/examschedule/selectexamschedule?examid=${selectedIndex}`,{
      withCredentials: true
      })
     console.log(res.data)

     if(res.data.message === 'success'){
      toast.success(`${res.data.data}`)
      setCurrentstep(3)
      window.location.reload()
      
      }

      if(res.data.message === 'failed'){
    
        toast.error(`${res.data.data}`)
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

  //exam data
  useEffect(() => {
    const getExam = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/entranceexam/entranceexamstatus`,{
            withCredentials: true
            })
           console.log(response.data)
           setExamresults(response.data.data)
        
        } catch (error) {
           
        }
        
    }

    getExam()
  },[])

  //sched data
  useEffect(() => {
    const getSched = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/examschedule/getselectedexamschedule`,{
            withCredentials: true
            })
           console.log('Sched',response.data)
           setSched(response.data.data)
        
        } catch (error) {
           
        }
        
    }

    getSched()
  },[])

  //credentials
  useEffect(() => {
    const getSched = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/studentuser/getstudentusernamepw`,{
            withCredentials: true
            })
           console.log('Credentials',response.data)
           setCredentials(response.data.data)
          //  setSched(response.data.data)
        
        } catch (error) {
           
        }
        
    }

    getSched()
  },[])

  const formatTimeWithPeriod = (time: any) => {
    if (!time) return ''; 
  
    const [hours, minutes] = time.split(':').map(Number); 
    const period = hours >= 12 ? 'PM' : 'AM'; 
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };



   //copy credentials
   const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!'); // Optionally show a confirmation (or use a toast)
    }).catch((err) => {
      toast.error('Failed to copy text');
    });
  };



  return (
    <DashboardLayout>
      <div className=" h-full w-full flex flex-col items-center justify-center gap-4">
        <p className=" text-sm text-zinc-500">Manage your application!</p>
        <h1 className=" text-2xl font-medium">Application Status</h1>

        

        <div className="flex items-center justify-center w-[80%] md:w-[500px] mt-8">
          {Steps.map((item, index) => (
             <li
             key={index}
             className={`flex items-center 
               ${index <= currentStep ? 'text-blue-600' : ''}
               ${index !== Steps.length - 1 && `
                 w-full 
                 after:content-[''] 
                 after:w-full 
                 after:h-1 
                 after:border-b 
                 after:border-4 
                 after:inline-block 
                 ${index < currentStep ? 'after:border-blue-100' : 'after:border-gray-200'} 
                 dark:after:border-blue-800
               `}
             `}
           >
             <div className={`p-2 flex items-center justify-center rounded-full ${index <= currentStep ? 'bg-blue-100' : 'bg-zinc-100'}`}>
               {item.icon}
             </div>
           </li>
          ))}
        
        </div>

        <div className=" flex flex-col items-center justify-center max-w-[500px] w-[90%] md:w-full h-auto border-[1px] border-zinc-100 rounded-md text-xs p-4 text-zinc-500 shadow-md">

          {currentStep === 0 && (
          <div className=" w-[90%] md:w-[500px] flex flex-col gap-2 items-center justify-center p-4 h-auto">
          

            <h2 className=" text-sm font-medium text-blue-950">Application Submitted </h2> 
            {/* <span className=" text-xs text-blue-500">at 11/22/2024</span> */}

            <p className="">{getStatus?.id}</p>


            <div className=" w-12 aspect-square rounded-full bg-zinc-50 flex items-center justify-center mt-6">
              {statusIcon()}
            </div>
            <p className=" uppercase">{getStatus?.status}</p>

            {getStatus?.status === 'denied' && (
             <p className=" text-red-400">
              {getStatus.denyreason}
             </p>
            )}

        
              
            <p className=" text-[.6rem] mt-6">{note()}</p>

             {getStatus?.status === 'approved' && (
              <div className=" flex items-end justify-end w-full text-white mt-4">
                <button    onClick={() => setCurrentstep((prev) => Math.max(prev + 1, 0))} className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit">Next <ChevronRight size={15}/></button>
              </div>
            )}

            {getStatus?.status === 'denied' && (
             <div className=" flex items-end justify-end w-full text-white mt-4">
              <a href="/dashboard/reapply" className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit"><RotateCw size={15}/>Re-Apply</a>
            </div>
            )}

          </div>
          )}

          {currentStep === 1 && (
            <div className=" w-full flex flex-col text-xs text-blue-950 ">
                <p className=" font-medium text-sm">Exam Schedule</p>

                <div className=" w-full p-2 flex flex-col gap-2  h-auto rounded-md mt-4">

                  <p>Select Schedule</p>
                  {schedule.map((item, index) => (
                    <div key={index} className=" w-full flex items-center justify-between p-3 h-auto bg-zinc-100 rounded-sm text-blue-950">
                      <div className=" flex items-center gap-2">
                        <Calendar size={20}/>
                        <p>{formatDate(item.date)}, {item.starttime} - {item.endtime}</p>
                      </div>

                      <input
                        type="checkbox"
                        checked={selectedIndex === item.id} 
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>
                  ))}
                 

                 
                </div>

                <div className=" flex items-end justify-end w-full text-white">
                  <button onClick={submitSchedule} className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit">Submit <ChevronRight size={15}/></button>
                </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className=" w-[90%] md:w-[500px] flex flex-col">
              <div className="  flex flex-col gap-2 items-center justify-center p-4 h-auto">
    
                <h2 className=" text-sm font-medium text-blue-950">Your Schedule</h2>

                <div className=" w-12 aspect-square rounded-full bg-zinc-50 flex items-center justify-center mt-6">
                  {statusIcon()}
                </div>
                <p>{sched[0]?.fullname}</p>
                <p>{formatDate(sched[0]?.date)}  {sched[0] &&
                    `${formatTimeWithPeriod(sched[0].examstart)} - ${formatTimeWithPeriod(sched[0].examend)}`}</p>
               

                  
                <p className=" text-[.6rem] mt-6">You have successfully selected your exam schedule. Please ensure to arrive on time and bring the required materials. Good luck!</p>

                <div className=" flex items-end justify-end w-full text-white">
                  <button onClick={() => setCurrentstep((prev) => Math.max(prev + 1, 0))} className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit">Next <ChevronRight size={15}/></button>
                </div>

              </div>
             
               
            </div>
          )}

          {currentStep === 3 && (
            <div className="  flex flex-col">
               <div className=" flex flex-col gap-2 items-center justify-center p-4 h-auto">
    
                <h2 className=" text-sm font-medium text-blue-950">Exam Results</h2>

                <div className=" w-12 aspect-square rounded-full bg-zinc-50 flex items-center justify-center mt-4">
                  {examresults?.status === 'passed' ? <Check size={25} className=" text-green-500"/> : <X size={25} className=" text-red-500"/>}
                </div>
                <p className=" uppercase">{examresults?.status}</p>
                <p className=" text-lg font-medium mt-4">Score : {examresults?.score}/100</p>

                {examresults?.status === 'passed' && (
                  <div className=" p-2 mt-4 flex flex-col gap-2">
                    <p>Your enrollment credentials</p>
                    <p className=" text-zinc-400 flex items-center gap-2">Username: <span className=" font-medium text-blue-950">{credentials?.username}</span><Copy onClick={() => copyToClipboard(credentials?.username || '')} size={15}/></p>
                    <p className=" text-zinc-400 flex items-center gap-2">Password: <span className=" font-medium text-blue-950">{credentials?.password}</span><Copy onClick={() => copyToClipboard(credentials?.password || '')} size={15}/></p>
                  </div>

                )}
                
                <p className=" text-[.6rem] mt-6">{examNote()}</p>

                {examresults?.status === 'passed' ? (
                  <div className=" flex items-end justify-end w-full text-white">
                  <button className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit">Proceed <LogIn size={15}/></button>
                </div>
                ): (
                  // <div className=" flex items-end justify-end w-full text-white">
                  //   <button className=" bg-blue-600 px-3 py-2 rounded-md flex items-center gap-1 w-fit"><RotateCw size={15}/>Retake </button>
                  // </div>

                  <>
                  </>
                )}
                  
              

              </div>
            </div>
          )}

         
        </div>

      </div>
    </DashboardLayout>
  );
}
