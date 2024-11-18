import React from 'react'
import Image from 'next/image';
import avatar from "../../assets/images/avatar.png"

const Dashboard = () => {
  return (
    <div className="bg-white  px-16">
    <div className="flex items-center justify-center py-28">
    <div className="w-auto flex justify-center px-12">
      <Image
        src={avatar}
        alt="Programmer Image"
        width={400}
        height={400}
        className="w-90 h-90 rounded-full object-cover"
        style={{ filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))' }}
      />
    </div>
    <div className="w-1/2 p-6 text-left px-12">
      <h5 className="text-3xl text-gray-900 mb-2">Hello!</h5>
      <h2 className="text-7xl font-bold text-gray-900 mb-4">I'm Ron Penaranda</h2>
      <h5 className="text-3xl text-gray-500 mb-2">Full Stack Developer</h5>
      <div className="mt-10 flex items-center justify-start gap-x-6">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Contact Me
        </a>
      </div>
    </div>
  </div>
  <div className="flex items-center">
    <div className="text-left px-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">With a strong foundation in web development, I have cultivated a diverse skill set that encompasses front-end technologies like JavaScript, React, and Next.js. My passion for creating dynamic and user-friendly web applications drives me to stay updated with the latest industry trends and best practices. I thrive on solving complex problems and enjoy the challenge of turning innovative ideas into functional solutions. Whether it's enhancing user experience or optimizing performance, I am committed to delivering high-quality work that exceeds expectations. My goal is to craft engaging digital experiences that not only meet user needs but also inspire and delight.</p>
    </div>
  </div>

  </div>
  )
}

export default Dashboard