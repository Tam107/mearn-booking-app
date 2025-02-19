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
const SuggestionTrainTicket = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
      };
  return (
    <>
        <div className='w-11/12 mx-auto my-10'>
            <div className='w-full pb-8 bg-[#FFF7ED] rounded-[50px]'>
                <div className='w-9/11 py-10 mx-auto'>
                    <div className='mt-4 text-center'>
                        <h2 className='font-[600] text-[36px] leading-[40px]'>Recommended Experience</h2>
                        <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280] my-[10px]'>Popular hotels to stay that Highlights of Vietnam recommends for you</p>
                    </div>
                    <br />
                    <div className='w-full'>
                        
                        <Slider {...settings}>
                            {[1,2,3,4,5,6,7].map(i=>(<div key={i} className="w-[90%]">
                                <img 
                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg" 
                                className='w-[90%] object-cover h-[362px] rounded-[16px] cursor-pointer' 
                                alt="Hanoi" 
                                />
                                <p className='mt-[10px] w-[90%] text-center  font-[500] text-[18px] leading-[18px]'>Dong Hoi - Ninh Binh</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
      
      
    </>
  )
}

export default SuggestionTrainTicket