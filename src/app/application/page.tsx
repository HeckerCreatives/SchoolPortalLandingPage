'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Check, ChevronLeft, ChevronRight, CircleAlert, CircleHelp, Copy, FileCheck, FileText, FileUser, ImageUp, LogIn, Phone, UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from 'react-hook-form';
import toast from "react-hot-toast";
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navigation from "../homepage/Navigation";



// Step validation schemas
const stepOneSchema = z.object({
  terms: z.boolean().refine((val) => val, 'You must accept the terms'),
});

const stepTwoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middlename: z.string().min(1, 'Middle name is required'),
  civilstatus: z.string().min(1, 'Civil Status is required'),
  religion: z.string().min(1, 'Religion is required'),
  address: z.string().min(1, 'Address is required'),
  gender: z.string().min(1, 'Gender is required'),

  motherfirstname: z.string().min(1, 'Firstname is required'),
  mothermaidenname: z.string().min(1, 'Maidenname is required'),
  motherlastnamename: z.string().min(1, 'Lastname is required'),
  mothercontact: z.string().min(1, 'Contact no. is required'),

  fatherfirstname: z.string().min(1, 'Firstname is required'),
  fatherlastnamename: z.string().min(1, 'Lastname is required'),
  fathercontact: z.string().min(1, 'Contact no. is required'),

  gfirstname: z.string().min(1, 'Firstname is required'),
  gmiddlename: z.string().min(1, 'Middlename is required'),
  glastnamename: z.string().min(1, 'Lastname is required'),
  gcontact: z.string().min(1, 'Contact no. is required'),

});

const stepThreeSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is empty'),
  telephone: z.string()
});

const stepFourSchema = z.object({
  program: z.string().min(1, 'Select program'),
  gradelevel: z.string().min(1, 'Select grade level'),

  form137: z
    .instanceof(File) // Ensures the value is a File instance
    .refine((file) => file.type === 'application/pdf', {
      message: 'Please upload a valid PDF file',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, { // Max size 10MB
      message: 'File size should not exceed 5MB',
    }),

  bc: z
    .any()
    .refine((file) => file instanceof File, 'File must be valid') // Ensuring file is valid
    .refine(
      (file) =>
        ['application/pdf', 'image/jpeg', 'image/png'].includes(file?.type),
      'Must be a PDF or image (JPEG/PNG)'
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB'),
});

type FormData = {
  terms: boolean;
  firstName: string;
  lastName: string;
  middlename: string;
  civilstatus: string
  religion: string
  address: string;
  gender: string;
  email: string;
  phone: string;
  telephone: string;
  program: string;
  gradelevel: string;
  password: string;
  form137: File | null;  // Updated to allow File | null
  bc: File | null;       // Updated to allow File | null


  motherfirstname: string
  mothermaidenname: string
  motherlastnamename: string
  mothercontact: string
  fatherfirstname: string 
  fatherlastnamename: string
  fathercontact: string
  gfirstname: string
  gmiddlename:  string
  glastnamename: string
  gcontact:  string
};

type Ticket = {
  username: string
  password: string
}



// Combined schema
const schemas = [stepOneSchema, stepTwoSchema, stepThreeSchema, stepFourSchema];

const Steps = [
  {name: 'Personal', icon: <FileCheck size={18}/>},
  {name: 'Contact', icon: <UserRound size={18}/>},
  {name: 'Contact', icon: <Phone size={18}/>},
  {name: 'File', icon: <FileText size={18}/>},
  {name: 'Success', icon: <Check size={18}/>},
]


type Program = {
  id: string
name: string
}

type Level = {
  id: string
level: string
}

export default function Home() {
  const [step ,setStep] = useState(0)
  const [currentStep, setCurrentstep] = useState(0)
  const [file, setFile] = useState(null);

  const [form137File, setForm137File] = useState<File>();
  const [bcFile, setBcFile] = useState<File>();

  const [ticket, setTicket] = useState<Ticket>()
  const [selectedprogram, setSelectedProgram] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [program, setProgram] = useState<Program[]>([])
  const [level, setLevel] = useState<Level[]>([])

  const methods = useForm<FormData>({
    resolver: zodResolver(schemas[step]),
    defaultValues: {
      terms: false,
      firstName: '',
      lastName: '',
      middlename: '',
      address: '',
      gender: '',
      email: '',
      phone: '',
      telephone: '',
      password: '',
      program:'',
      gradelevel: '',
      form137: null,  // Correct default value for form137
      bc: null,  
           // Correct default value for bc
    },
  });
  
  

  const { handleSubmit, formState, register, setValue, trigger, reset } = methods;

  const [formData, setFormData] = useState<FormData>(); // To store form data

  const onSubmit = async (data: any) => {
    setFormData((prevData: any) => ({ ...prevData, ...data })); // Merge new data with existing form data

    // If it's not the last step, move to the next step
    if (step < schemas.length - 1) {
      trigger()
        .then((isValid) => {
          if (isValid) {
            setStep((prev) => prev + 1);
          }
        })
        .catch(console.error);
    } else if (formData?.gradelevel !== '' && formData?.program !== '') {
      console.log('Final data:', { ...formData, ...data }); // Log all collected data
      try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/requirement/submitrequirement`,{
          firstname: formData?.firstName,
          lastname:formData?.lastName,
          middlename:formData?.middlename,
          address: formData?.address,
          gender: formData?.gender,
          civilstatus: formData?.civilstatus,
          religion: formData?.religion,
        
          email: formData?.email,
          phonenumber: formData?.phone,
          telephonenumber: formData?.telephone,
          form: form137File,
          bc: bcFile,
          program: selectedprogram,
          level: selectedLevel,

          mfirstname: formData?.motherfirstname,
          mlastname: formData?.motherlastnamename,
          mcontact: formData?.mothercontact,

          ffirstname: formData?.fatherfirstname,
          flastname: formData?.fatherlastnamename,
          fcontact: formData?.fathercontact,

          gfirstname: formData?.gfirstname,
          glastname: formData?.glastnamename,
          gcontact: formData?.gcontact,
       },
       {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
       }
      )

       const response = await toast.promise(request, {
           loading: 'Submitting requirements....',
           success: `Application submitted`,
           error: 'Error while submitting your application',
       });

       if (response.data.message === 'success'){
        setStep(4)
        setTicket(response.data.data)
        reset()
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
  };

  

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));


const handleForm137Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    setValue('form137', file, { shouldValidate: true }); // Correctly set the file value
    setForm137File(file)
  }
};

const handleBcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files ? e.target.files[0] : null;
  if (file) {
    setValue('bc', file, { shouldValidate: true }); // Correctly set the file value
    setBcFile(file)
  }
};

  //copy credentials
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!'); // Optionally show a confirmation (or use a toast)
    }).catch((err) => {
      toast.error('Failed to copy text');
    });
  };

   const listGradelevels = () => {
     if(selectedprogram === 'Nursery'){
       return level.slice(0,2)
     } else if (selectedprogram === 'Pre-school') {
       return level.slice(2,5)
     } else if( selectedprogram === 'Elementary'){
       return level.slice(5,11)
     } else if(selectedprogram === 'Junior High-School'){
       return level.slice(11,15)
     } else {
       return level.slice(15,17)
     }
   }

  useEffect(() => {
    const getProgram = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/program/getallprogram`,{
            withCredentials: true
            })
           console.log('Programs',res.data)
           setProgram(res.data.data)
         
           
        } catch (error) {
           
        }
        
    }

    getProgram()
  },[])

  useEffect(() => {
    const getGradeLevel = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/gradelevel/getallgradelevel`,{
            withCredentials: true
            })
           console.log('Grade level',res.data)
           setLevel(res.data.data)
        
           
        } catch (error) {
           
        }
        
    }

    getGradeLevel()
  },[])





  return (
    <div className=" relative h-auto md:h-screen w-full bg-white flex flex-col overflow-x-hidden overflow-y-auto">
      <Navigation/>
      <div className=" h-auto w-full flex flex-col items-center justify-center gap-4 mt-12 lg:mt-0 py-20">
        <p className=" text-sm text-zinc-500">Start your application now!</p>
        <h1 className=" text-2xl font-medium">Welcome to Lorem Ipsum</h1>

        

        <div className="flex items-center justify-center w-[250px] md:w-[500px] mt-8">
          {Steps.map((item, index) => (
             <li
             key={index}
             className={`flex items-center 
               ${index <= step ? 'text-pink-600' : ''}
               ${index !== Steps.length - 1 && `
                 w-full 
                 after:content-[''] 
                 after:w-full 
                 after:h-1 
                 after:border-b 
                 after:border-4 
                 after:inline-block 
                 ${index < step ? 'after:border-pink-100' : 'after:border-zinz-50'} 
                 dark:after:border-blue-800
               `}
             `}
           >
             <div className={`p-2 flex items-center justify-center rounded-full ${index <= step ? 'bg-pink-50' : 'bg-zinc-100'}`}>
               {item.icon}
             </div>
           </li>
          ))}
        
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col w-[90%] md:w-full max-w-[500px] h-auto border-[1px] border-zinc-100 rounded-md text-xs p-4 text-zinc-500 shadow-md">
            {step === 0 && (
              <div className="  w-[90%] md:w-full flex flex-col">
                <p className=" text-black font-medium text-sm">Informed Consent<span className=" text-red-600">*</span></p>

                <p className=" text-xs mt-2 text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem assumenda tempora obcaecati officia, aspernatur at, dignissimos illum est cupiditate facilis quod maxime ratione. Nulla aspernatur temporibus sit minima natus?</p>
                <p className=" text-xs mt-2 text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem assumenda tempora obcaecati officia, aspernatur at, dignissimos illum est cupiditate facilis quod maxime ratione. Nulla aspernatur temporibus sit minima natus?</p>
                <p className=" text-xs mt-2 text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem assumenda tempora obcaecati officia, aspernatur at, dignissimos illum est cupiditate facilis quod maxime ratione. Nulla aspernatur temporibus sit minima natus?</p>
                <p className=" text-xs mt-2 text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem assumenda tempora obcaecati officia, aspernatur at, dignissimos illum est cupiditate facilis quod maxime ratione. Nulla aspernatur temporibus sit minima natus?</p>
                <p className=" text-xs mt-2 text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem assumenda tempora obcaecati officia, aspernatur at, dignissimos illum est cupiditate facilis quod maxime ratione. Nulla aspernatur temporibus sit minima natus?</p>

                <div className=" flex items-center gap-2 mt-4">
                  <input type="checkbox" {...methods.register('terms')} />
                  <p>I agree and accept conditions</p>
                </div>
                <p className=" text-[.6rem] text-red-500">{formState.errors.terms?.message}</p>

              
            </div>
            )}

            {step === 1 && (
              <div className="  w-[90%] md:w-full flex flex-col">
                <p className=" text-black font-medium text-sm">Personal Information <span className=" text-red-600">*</span></p>
                <label htmlFor="" className=" mt-4">First Name</label>
                <input type="text" placeholder="First name" className=" input-primary" {...methods.register('firstName')}/>
                <p className=" text-[.6rem] text-red-500">{formState.errors.firstName?.message}</p>

                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">Last Name</label> 
                    <input type="text" placeholder="First name" className=" input-primary" {...methods.register('lastName')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.lastName?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">Middle Name</label> 
                    <input type="text" placeholder="First name" className=" input-primary" {...methods.register('middlename')} />
                    <p className=" text-[.6rem] text-red-500">{formState.errors.middlename?.message}</p>

                  </div>
            
                </div>

                <p className=" text-black mt-4">Address</p>
                <input type="text" placeholder="Address" className=" input-primary" {...methods.register('address')}/>
                <p className=" text-[.6rem] text-red-500">{formState.errors.address?.message}</p>

                <p className=" text-black mt-4">Civil Status</p>
                {/* <input type="text" placeholder="Civil Status" className=" input-primary" {...methods.register('civilstatus')}/> */}
                <Select onValueChange={(value) => setValue('civilstatus', value)} {...methods.register('civilstatus')}>
                  <SelectTrigger className="input-primary">
                    <SelectValue placeholder="Civil Status" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {/* Civil Status Options */}
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Separated">Separated</SelectItem>
                  </SelectContent>
                </Select>

                <p className=" text-[.6rem] text-red-500">{formState.errors.civilstatus?.message}</p>

                <p className=" text-black mt-4">Religion</p>
                <input type="text" placeholder="Religion" className=" input-primary" {...methods.register('religion')}/>
                <p className=" text-[.6rem] text-red-500">{formState.errors.religion?.message}</p>


                <p className=" text-black mt-4">Gender</p>
                {/* <input type="text" placeholder="Address" className=" p-3 rounded-sm bg-zinc-100" {...methods.register('gender')}/> */}
                <Select onValueChange={(value) => setValue('gender', value)} {...methods.register('gender')}>
                <SelectTrigger className="input-primary">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className=" text-xs">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>

                <p className=" text-[.6rem] text-red-500">{formState.errors.gender?.message}</p>
                

                <p className=" text-black font-medium mt-2">Mother Details</p>
                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">First Name</label> 
                    <input type="text" placeholder="First name" className=" input-primary" {...methods.register('motherfirstname')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.motherfirstname?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                  <label htmlFor="" className="">Maiden Name</label> 
                    <input type="text" placeholder="Maiden name" className=" input-primary" {...methods.register('mothermaidenname')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.mothermaidenname?.message}</p>

                  </div>
            
                </div>

                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">Lastname Name</label> 
                    <input type="text" placeholder="Last name" className=" input-primary" {...methods.register('motherlastnamename')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.motherlastnamename?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                  <label htmlFor="" className="">Contact no.</label> 
                    <input type="number" placeholder="Contact no." className=" input-primary" {...methods.register('mothercontact')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.mothercontact?.message}</p>

                  </div>
            
                </div>

                <p className=" text-black font-medium mt-2">Father Details</p>
                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">First Name</label> 
                    <input type="text" placeholder="First name" className=" input-primary" {...methods.register('fatherfirstname')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.fatherfirstname?.message}</p>

                  </div>
            
                </div>

                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">Lastname Name</label> 
                    <input type="text" placeholder="Last name" className=" input-primary" {...methods.register('fatherlastnamename')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.fatherlastnamename?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                  <label htmlFor="" className="">Contact no.</label> 
                    <input type="number" placeholder="Contact no." className=" input-primary" {...methods.register('fathercontact')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.fathercontact?.message}</p>

                  </div>
            
                </div>

                <p className=" text-black font-medium mt-2">Gurdian Details</p>
                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">First Name</label> 
                    <input type="text" placeholder="First name" className=" input-primary" {...methods.register('gfirstname')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.gfirstname?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                  <label htmlFor="" className="">Maiden Name</label> 
                    <input type="text" placeholder="Maiden name" className=" input-primary" {...methods.register('gmiddlename')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.gmiddlename?.message}</p>

                  </div>
            
                </div>

                <div className=" flex items-center gap-2 mt-2">
                  <div className=" flex flex-col w-full">
                    <label htmlFor="" className="">Lastname Name</label> 
                    <input type="text" placeholder="Last name" className=" input-primary" {...methods.register('glastnamename')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.glastnamename?.message}</p>

                  </div>
    
                  <div className=" flex flex-col w-full">
                  <label htmlFor="" className="">Contact no.</label> 
                    <input type="number" placeholder="Contact no." className=" input-primary" {...methods.register('gcontact')}/>
                    <p className=" text-[.6rem] text-red-500">{formState.errors.gcontact?.message}</p>

                  </div>
            
                </div>

    

            
            </div>
            )}

            {step === 2 && (
              <div className=" w-full flex flex-col">
                  <p className=" text-black font-medium text-sm">Contact Information <span className=" text-red-600">*</span></p>
                
                    <div className=" flex flex-col w-full mt-2">
                      <label htmlFor="" className="">Email</label> 
                      <input type="text" placeholder="First name" className=" input-primary" {...methods.register('email')}/>
                      <p className=" text-[.6rem] text-red-500">{formState.errors.email?.message}</p>

                    </div>
      
                    <div className=" flex flex-col w-full mt-2">
                      <label htmlFor="" className="">Phone No.</label> 
                      <input type="number" placeholder="Phone no" className=" input-primary" {...methods.register('phone')}/>
                      <p className=" text-[.6rem] text-red-500">{formState.errors.phone?.message}</p>

                    </div>

                    <div className=" flex flex-col w-full mt-2">
                      <label htmlFor="" className="">Telephone No. (optional)</label> 
                      <input type="number" placeholder="Telephone no." className=" input-primary" {...methods.register('telephone')}/>
                      <p className=" text-[.6rem] text-red-500">{formState.errors.telephone?.message}</p>
                    </div>
            
              </div>
            )}

            {step === 3 && (
              <div className=" w-full flex flex-col">
                  <p className=" text-black font-medium text-sm">Program <span className=" text-red-600">*</span></p>
                  <Select onValueChange={(value) => {setValue('program', value), setSelectedProgram(value)}} {...methods.register('program')}>
                  <SelectTrigger className=" input-primary">
                    <SelectValue placeholder="Select Program" />
                  </SelectTrigger>
                  <SelectContent>
                    {program.map((item, index) => (
                      <SelectItem onClick={() => setSelectedProgram(item.name)} key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                    
                    
                  </SelectContent>
                </Select>
                  <p className=" text-[.6rem] text-red-500">{formState.errors.program?.message}</p>

                  <p className=" text-black font-medium text-sm mt-2">Grade Levels <span className=" text-red-600">*</span></p>
                  <Select onValueChange={(value) => {setValue('gradelevel', value), setSelectedLevel(value)}} {...methods.register('gradelevel')}>
                  <SelectTrigger className=" input-primary">
                    <SelectValue placeholder="Select Grade Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    {listGradelevels().map((item, index) => (
                      <SelectItem key={item.id} value={item.id}>{item.level}</SelectItem>
                    ))}
                    
                  </SelectContent>
                </Select>
                  <p className=" text-[.6rem] text-red-500">{formState.errors.gradelevel?.message}</p>


                  <p className=" text-black font-medium text-sm mt-2">Documents <span className=" text-red-600">*</span></p>
                
                    <div className=" flex flex-col gap-1 w-full mt-2">
                      <label htmlFor="" className="">From 137 (pdf)</label> 
                      <div className=' w-full h-[100px] bg-pink-50 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-md'>
                        <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                          <div className=' w-full h-full flex flex-col items-center justify-center gap-1 text-[.7rem]'>
                            <FileCheck size={20}/>
                            <p>Click to upload</p>
                            <p>Pdf (MAX. 5mb)</p>

                            <p className=' text-zinc-400 mt-2'>{form137File?.name}</p>
                          </div>

                                <input
                                className=" hidden"
                                  type="file"
                                  id="dropzone-file"
                                  accept="application/pdf"
                                  onChange={(e) => {
                                    handleForm137Change(e); // Call your custom file change handler
                                    register('form137').onChange(e); // Call the register-provided onChange handler
                                  }}
                                />
                        </label>
                      </div>
                      <p className=" text-[.6rem] text-red-500">{formState.errors.form137?.message}</p>

                    </div>
      
                    <div className=" flex flex-col w-full mt-2">
                      <label htmlFor="" className="">Birth Certificate (pdf/jpeg)</label> 
                      <div className=' w-full h-[100px] bg-pink-50 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-md'>
                        <label htmlFor="dropzone-file2" className=' w-full h-full flex flex-col items-center justify-center'>

                          <div className=' w-full h-full flex flex-col items-center justify-center gap-1 text-[.7rem]'>
                            <FileCheck size={20}/>
                            <p>Click to upload</p>
                            <p>Pdf (MAX. 5mb)</p>

                            <p className=' text-zinc-400 mt-2'>{bcFile?.name}</p>
                          </div>

                          <input
                          className=" hidden"
                                  type="file"
                                  id="dropzone-file2"
                                  accept="application/pdf,image/jpeg,image/png"
                                  onChange={(e) => {
                                    handleBcChange(e); // Call your custom file change handler
                                    register('bc').onChange(e); // Call the register-provided onChange handler
                                  }}
                                />
                        </label>
                      </div>
                      <p className=" text-[.6rem] text-red-500">{formState.errors.bc?.message}</p>

                    </div>

            
              </div>
            )}

            {step === 4 && (
              <div className=" w-full flex flex-col gap-2 items-center justify-center p-4 h-auto">
                <div className=" w-12 aspect-square rounded-full bg-zinc-100 text-green-500 flex items-center justify-center">
                  <Check size={25}/>
                </div>

                <h2 className=" text-sm">Application Submitted</h2>

                <p className=" text-zinc-400 mt-4 flex items-center gap-2">Ticket Id: <span className=" font-medium text-blue-950">{ticket?.username}</span><Copy onClick={() => copyToClipboard(ticket?.username || '')} size={15}/></p>
                <p className=" text-zinc-400 flex items-center gap-2">Password: <span className=" font-medium text-blue-950">{ticket?.password}</span><Copy onClick={() => copyToClipboard(ticket?.password || '')} size={15}/></p>

                <div className=" flex items-start gap-2 w-[90%] text-blue-300 mt-6">
                  <CircleAlert size={30}/>
                  <p className=" text-[.6rem]">Please remember to copy your Ticket ID and Password before proceeding. Use the copy icons for convenience. Keep this information secure as it may be required for access.</p>

                </div>

                <a href="/applicationportal/signin" className=" underline mt-4 text-blue-950">Log in Now</a>

              </div>
            )}

            {step !== 4 && (
              <div className=" w-full flex items-center justify-end gap-2 mt-6">
                {step > 0 && <button type="button" onClick={onBack}  className=" bg-pink-600 px-3 py-2 rounded-md flex items-center gap-1 text-white">Back</button>}
                <button type="submit"  className=" bg-pink-600 px-3 py-2 rounded-md flex items-center gap-1 text-white">{step === schemas.length - 1 ? 'Submit' : 'Next'}</button>
              </div>
            )}
            
          </form>
        </FormProvider>

      </div>

      {/* <input type="file" accept="application/pdf" onChange={handleFileChange} /> */}

     
    </div>
  );
}
