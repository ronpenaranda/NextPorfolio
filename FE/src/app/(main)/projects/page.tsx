import React from 'react'
import CardApp from '@/components/app-card';
import { projects } from '@/api/dummyapi'

const Page = () => {
  return (
    <div className="min-w-[500px] max-w-full overflow-auto items-center justify-center bg-white p-6">
      <div className='py-4'>
      <h2 className="text-2xl md:text-2xl text-gray-900 mb-2"> List of Projects </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>
      </div>
      <div className='flex flex-wrap gap-4'>
        {projects.map((item, index) => {
          return(
            <div key={index}>
            <CardApp content={item}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page