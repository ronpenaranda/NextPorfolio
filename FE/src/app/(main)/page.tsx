import React from "react";
import Image from "next/image";
import avatar from "@/assets/images/avatar.png";
import Skills from "@/components/app-dashboard-card";
import MenuService from "@/services/menu";

export const revalidate = 0;

const Dashboard = async () => {
  const personalinfo = await MenuService.getPersonalInfo();
  const data = personalinfo[0]

  return (
    <div>
    <div className="bg-white px-6 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-center py-16 md:py-28 gap-8">
        <div className="flex justify-center px-4 md:px-12">
          <Image
            src={avatar}
            alt="Programmer Image"
            width={400}
            height={400}
            className="w-90 h-90 md:w-90 md:h-90 rounded-full object-cover"
            style={{ filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))" }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-6 text-center md:text-left px-4 md:px-12">
          <h5 className="text-2xl md:text-3xl text-gray-900 mb-2">{data.personal[0].greetings}</h5>
          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-4">
          {data.personal[0].fullname}
          </h2>
          <h5 className="text-xl md:text-3xl text-gray-500 mb-2">
          {data.personal[0].title}
          </h5>
          <div className="mt-6 md:mt-10 flex items-center justify-center md:justify-start gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 md:px-16">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          {data.about}
          </p>
        </div>
      </div>
      <div className="flex px-4 md:px-16 pt-10 lg:pt-20 gap-5">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {data.skills.map((item:any, index: number) => {
              return (
                <div key={index}>
                  <Skills content={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 md:px-16 lg:pt-20 pt-10">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <div className="relative mt-6">
            <div className="absolute left-2 top-0 w-0.5 bg-gray-300 h-full"></div>

            {data.experience.map((experience: any) => (
              <div
                key={experience.id}
                className="mb-8 flex items-start pl-8 relative"
              >
                <div className="w-4 h-4 rounded-full bg-slate-400 absolute left-0 -top-1.5 border-2 border-white"></div>
                <div className="flex-1 ml-6 m-2">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">
                      {experience.company}
                    </p>
                    <span className="text-sm text-gray-500">
                      {experience.duration}
                    </span>
                  </div>
                  <p className="text-md text-gray-700 pb-3">
                    {experience.position}
                  </p>
                  <ul className="text-gray-700 list-disc pl-5">
                    {experience.description.map((desc: any, index: number) => (
                      <li key={index} className="text-sm p-2">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;