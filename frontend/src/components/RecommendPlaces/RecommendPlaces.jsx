import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        // <div style={{ ...style, display: "block", background: "blue",width:"50px",height:"50px" ,borderRadius:"100%" }} onClick={props.onClick} >

        // </div>
        <div
        className={className}
        style={{ ...style, display: "flex", background: "#4F46E5" ,width:"35px",height:"35px" ,borderRadius:"100%",alignItems:"center",justifyContent:"center",paddingTop:"3px"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <></>
    );
  }
const RecommendPlaces = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
      };
      
  return (
    <>
        <div className='w-11/12 mx-auto my-10'>
            <div className=' md:px-[24px] md:my-[20px]'>
                <div className='text-center flex flex-col gap-[10px]'>
                    <h2 className='font-[600] text-[36px] leading-[40px] text-[#1F2937]'>Highlights places</h2>
                    <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280]'>Popular places that Chisfis recommends for you</p>
                </div>
                <div className='mt-5 w-full'>
                    <Slider {...settings}>
                        {[1,2,3,4,5,6,7].map(i=>(<div key={i} className="w-[90%] h-[400px]">
                            <img 
                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg" 
                            className='w-[90%] object-cover h-[332px] rounded-[16px] cursor-pointer' 
                            alt="Hanoi" 
                            />
                            <p className='mt-[10px]'>Hanoi</p>
                             </div>
                        ))}
                    </Slider>

                </div>
            </div>
        </div>
    </>
  )
}

export default RecommendPlaces