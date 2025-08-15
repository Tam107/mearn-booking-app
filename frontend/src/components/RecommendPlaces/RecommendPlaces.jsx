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
                width: "35px",
                height: "35px",
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "3px",
                zIndex: 10,
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return null;
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
            },
        ]
    };

    const images = [
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Hanoi" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Ho Chi Minh" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Hue" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Da Nang" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Nha Trang" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Phu Quoc" },
        { src: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR_S2PI2l7SBtzuOsZGQhrr_0FaZwkDLMwJ1y5IQImoTeQW87Ubz3tfjuOfCEqWz3frx9ZzqhAX9YqCo9CGYuqRH1EZ00mK9hcqda6Ikg", name: "Sapa" },
    ];

    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='text-center flex flex-col gap-2 mb-5'>
                <h2 className='font-[600] text-[36px] leading-[40px] text-[#1F2937]'>Highlights places</h2>
                <p className='font-[400] text-[16px] leading-[24px] text-[#6B7280]'>Popular places that Chisfis recommends for you</p>
            </div>
            <Slider {...settings}>
                {images.map((item, i) => (
                    <div key={i} className="px-2">
                        <img
                            src={item.src}
                            alt={item.name}
                            className='w-full object-cover h-[250px] lg:h-[332px] rounded-[16px] cursor-pointer'
                        />
                        <p className='mt-2 text-center font-medium'>{item.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default RecommendPlaces;
