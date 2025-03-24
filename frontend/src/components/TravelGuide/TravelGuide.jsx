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
const TravelGuide = () => {
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
        <div className='mx-auto w-11/12 my-10'>
            <div className='w-9/11 py-10 mx-auto'>
                <div className='flex items-center justify-center'>
                    <h2 className='font-[600] text-[36px] leading-[40px]'>Travel Guide</h2>
                </div>
                <br />
                <div className='w-full'>
                        
                    <Slider {...settings}>
                        {[1,2,3,4,5,6,7].map(i=>(<div key={i} className="w-[90%]">
                            <img 
src="https://s3-alpha-sig.figma.com/img/edd0/72d4/518cf5d2b4f0c7fa134ac4b17c231985?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qMPhvuiYfho3C2iITVFfGu-vGXG~GJxIBNu7FIomTxZwwyTp7mSm4SbEJZyM-KWLE0THliT9GQy0sN3B4cTCgheMWbmBpwOndj7MW~-JNiF1gL2h1baGFPLaw2~hZggRwwAk2b19kkH6g4jUi-xVKbTnoThuZz1j5UCOVW2fg6nfA5SoN68bvxEqmKZLeVFbkJGl6aB9gKzngaXMgGwItAmN7hLuRubVHzTEyH0Q7eKrS8xxZbvHcqlJFx-vxjzmwLOCHmmA4xdnQFftv95VyL4MuQwjOPuXM~1jFBqp6KG~84v1CP1PSBXql8kk511rhovy8HUNHtS~B~jJLQa3bA__"               className='w-[90%]  object-cover  rounded-[16px] cursor-pointer'             alt="Hanoi" 
                            />
                            <p className='mt-[10px] w-[90%] font-[500] text-[18px] leading-[18px]'>Sapa</p>
                            </div>
                        ))}
                    </Slider>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default TravelGuide