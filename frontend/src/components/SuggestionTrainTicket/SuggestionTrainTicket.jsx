import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "flex", 
        background: "#4F46E5",
        width:"35px",
        height:"35px",
        borderRadius:"50%",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:"3px"
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <></>;
}

const SuggestionTrainTicket = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const data = [
    "Dong Hoi - Ninh Binh",
    "Hanoi - Hue",
    "Saigon - Da Nang",
    "Hue - Hoi An",
    "Da Lat - Nha Trang",
    "Hanoi - Sapa",
    "Ho Chi Minh - Phan Thiet"
  ];

  return (
    <div className='w-11/12 mx-auto my-10'>
      <div className='w-full pb-8 bg-[#FFF7ED] rounded-[50px]'>
        <div className='w-11/12 md:w-9/12 py-10 mx-auto'>
          <div className='text-center'>
            <h2 className='font-[600] text-[36px] leading-[40px]'>Recommended Train Experience</h2>
            <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280] my-[10px]'>
              Popular train routes that Highlights of Vietnam recommends for you
            </p>
          </div>

          <Slider {...settings} className='mt-6'>
            {data.map((item, i) => (
              <div key={i} className="px-2">
                <img 
                  src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg" 
                  className='w-full object-cover h-[362px] rounded-[16px] cursor-pointer' 
                  alt={item} 
                />
                <p className='mt-2 text-center font-[500] text-[16px]'>{item}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default SuggestionTrainTicket;
