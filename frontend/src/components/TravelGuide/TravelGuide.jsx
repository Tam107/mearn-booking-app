import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'flex',
                background: '#4F46E5',
                width: '35px',
                height: '35px',
                borderRadius: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '3px',
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <></>;
}

const TravelGuide = () => {
    // Sample data for 6 travel destinations
    const destinations = [
        {
            id: 1,
            title: 'Sapa',
            imageUrl:
                "https://hkh.vn/wp-content/uploads/2022/04/tourist-woman-hoi-an-vietnam-shutterstock_788077351-1024x683-1.jpg",
        },
        {
            id: 2,
            title: 'Hanoi',
            imageUrl: 'https://hkh.vn/wp-content/uploads/2022/04/tourist-woman-hoi-an-vietnam-shutterstock_788077351-1024x683-1.jpg', // Replace with actual URL
        },
        {
            id: 3,
            title: 'Ha Long Bay',
            imageUrl: 'https://hkh.vn/wp-content/uploads/2022/04/tourist-woman-hoi-an-vietnam-shutterstock_788077351-1024x683-1.jpg', // Replace with actual URL
        },
        {
            id: 4,
            title: 'Da Nang',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa-jERvwjSEMVGckPmISDEROexN2zUr7R3kA&s', // Replace with actual URL
        },
        {
            id: 5,
            title: 'Hoi An',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZgF8PS0MjIErLzCxPcimLZvEPm4u4xEotg&s', // Replace with actual URL
        },
        {
            id: 6,
            title: 'Ho Chi Minh City',
            imageUrl: 'https://hkh.vn/wp-content/uploads/2022/04/tourist-woman-hoi-an-vietnam-shutterstock_788077351-1024x683-1.jpg', // Replace with actual URL
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Adjusted to show 3 slides at a time for better layout with 6 images
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="mx-auto w-11/12 my-10">
            <div className="w-9/12 py-10 mx-auto">
                <div className="flex items-center justify-center">
                    <h2 className="font-[600] text-[36px] leading-[40px]">Travel Guide</h2>
                </div>
                <br />
                <div className="w-full">
                    <Slider {...settings}>
                        {destinations.map((destination) => (
                            <div key={destination.id} className="px-2">
                                <img
                                    src={destination.imageUrl}
                                    className="w-full object-cover rounded-[16px] cursor-pointer"
                                    alt={destination.title}
                                />
                                <p className="mt-[10px] font-[500] text-[18px] leading-[18px]">
                                    {destination.title}
                                </p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default TravelGuide;