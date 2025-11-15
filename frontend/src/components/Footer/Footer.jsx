import React from 'react'

const Footer = () => {
  const footerData = [
    {
      title: "Highlights of Vietnam",
      links: ["Facebook", "Youtube", "Instagram"]
    },
    {
      title: "Links",
      links: ["About Us", "Contact", "Support"]
    },
    {
      title: "Explore",
      links: ["Destinations", "Hotels", "Tours"]
    },
    {
      title: "Follow Us",
      links: ["Facebook", "Youtube", "Instagram"]
    }
  ];

  return (
      <div className='w-full border-t border-gray-300 py-10 bg-gray-50'>
        <div className='mx-auto w-11/12 md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4'>
          {footerData.map((section, idx) => (
              <div key={idx} className='flex flex-col gap-2'>
                <h4 className='font-[500] text-lg mb-4'>{section.title}</h4>
                {section.links.map((link, index) => (
                    <p key={index} className='text-gray-700 hover:text-gray-900 cursor-pointer'>
                      {link}
                    </p>
                ))}
              </div>
          ))}
        </div>
        <div className='mt-6 text-center text-gray-500 text-sm'>
          © {new Date().getFullYear()} Highlights of Vietnam. All rights reserved.
        </div>
      </div>
  )
}

export default Footer;
