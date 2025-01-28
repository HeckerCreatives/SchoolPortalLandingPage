import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

const Images = [
  '/facility/classroom.jpg',
  '/facility/library.jpg',
]


export default function Facilities() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const bg = Images.find((item, index) => index === current - 1)


  return (
    <div className=' relative w-full h-auto py-20 flex items-center justify-center px-4'
    style={{backgroundImage: `url(${bg})`, backgroundSize:'cover'}}
    >

      <div className=' absolute h-full w-full bg-zinc-950/70'>

      </div>
        <div className=' relative z-10 text-white w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-2'>

            <div className=' w-full h-full flex flex-col justify-center gap-4'>
                <h2 className=' text-5xl font-medium max-w-[500px]'>Our Campus, Your Child’s Second Home</h2>
                <p className=' text-sm'>State-of-the-art facilities for world-class learning:</p>

                <button className=' border-[1px] mt-6 border-pink-600 bg-pink-600 text-white px-4 py-2 text-xs font-medium w-fit'>Take a Virtual Tour</button>

            </div>

            <div className='  w-full h-[300px] lg:h-[500px] flex items-center justify-center lg:mt-0 mt-8'>
            <Carousel 
            opts={
              {
                loop: true
              }
            }
            plugins={[
              Autoplay({
                delay: 3000
              })
            ]}
            className='  w-full h-[300px] lg:h-[500px]' setApi={setApi}>
              <CarouselContent className=' h-full w-full '
              >
                {Images.map((item, index) => (
                  <CarouselItem key={index} className='  w-full h-[300px] lg:h-[500px] '
                  style={{backgroundImage: `url(${item})`, backgroundSize:'cover'}}
                  ></CarouselItem>
                ))}
                
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>

            </div>
            

            
        </div>

    </div>
  )
}
