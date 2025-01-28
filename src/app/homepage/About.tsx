import React from 'react'

export default function About() {
  return (
    <div id='about' className=' w-full h-auto py-20 flex flex-col gap-12 items-center justify-center px-4'>
      <div className='w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
        <div className=' w-full flex flex-col gap-2'>
          <h2 className=' text-4xl max-w-[400px] font-medium'>A Few Words About the University</h2>
          <p className=' text-sm text-zinc-500 mt-6'>Welcome to Bright Futures Academy, where we believe every child has the potential to shine! Our school is dedicated to nurturing lifelong learners, fostering creativity, and cultivating a community where students thrive academically, socially, and emotionally. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam deserunt aliquid ipsa quam qui itaque fugit omnis, ullam explicabo corporis tempora iusto aspernatur officia repellendus iure facilis? Perspiciatis, ab beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis possimus laudantium quod consequatur similique et deserunt. At nisi sit rem cupiditate possimus, libero sapiente tempore, repellat labore pariatur eos autem.</p>

          <p className=' text-sm text-zinc-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint officia alias iste quia consequuntur atque nemo ad, unde officiis quae? Maiores non illum ducimus aperiam reiciendis amet commodi laboriosam voluptates.</p>
        </div>

        <div className=' w-full flex flex-col gap-2'>
          <div className=' w-full aspect-square bg-zinc-100'>

          </div>
          <p className=' text-lg font-semibold text-pink-600'>Jhon Doe</p>
          <p className=' text-sm text-zinc-500'>President of Lorem Ipsum School</p>
        </div>
        
      </div>

      <div className='w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12'>
        
        <div className=' w-full flex flex-col gap-2'>
          <div className=' w-full aspect-square bg-zinc-100'>

          </div>
        
        </div>

        <div className=' w-full flex flex-col gap-2'>
          <p className=' text-sm text-zinc-500 mt-6'>Welcome to Bright Futures Academy, where we believe every child has the potential to shine! Our school is dedicated to nurturing lifelong learners, fostering creativity, and cultivating a community where students thrive academically, socially, and emotionally. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam deserunt aliquid ipsa quam qui itaque fugit omnis, ullam explicabo corporis tempora iusto aspernatur officia repellendus iure facilis? Perspiciatis, ab beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis possimus laudantium quod consequatur similique et deserunt. At nisi sit rem cupiditate possimus, libero sapiente tempore, repellat labore pariatur eos autem.</p>

          <p className=' text-sm text-zinc-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint officia alias iste quia consequuntur atque nemo ad, unde officiis quae? Maiores non illum ducimus aperiam reiciendis amet commodi laboriosam voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque consectetur magni facere voluptas delectus accusamus aperiam, inventore sint blanditiis vel ipsam quaerat expedita neque fugit similique maiores placeat obcaecati?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, suscipit dolorem magni commodi aliquid eveniet dignissimos alias vero maxime maiores, quisquam quia atque culpa rem? Eum molestias ullam repellendus quaerat.</p>

          <a href='/aboutus' className=' border-[1px] border-pink-600 bg-pink-600 text-white px-6 py-2 text-sm font-medium w-fit mt-8'>See more</a>

        </div>
        
      </div>
    </div>
  )
}
