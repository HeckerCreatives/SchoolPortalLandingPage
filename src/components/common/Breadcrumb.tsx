import React from 'react'

type Props = {
    slug: string
}

export default function Breadcrumb(prop: Props) {
  return (
    <div className=' flex items-center gap-2 text-[.7rem] md:text-sm font-serif'>
        <a href="/" className=' hover:text-pink-600'>Home</a>
        <p>/</p>
        <a href="/news" className=' hover:text-pink-600'>News</a>
        <p>/</p>
        <p>{prop.slug}</p>
    </div>
  )
}
