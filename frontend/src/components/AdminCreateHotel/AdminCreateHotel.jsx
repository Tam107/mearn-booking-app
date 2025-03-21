import { Form } from 'antd'
import React, { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city';
import { IoCloudUploadOutline } from "react-icons/io5";



const AdminCreateHotel = () => {
    const [cities, setCities] = useState([]);
    const [citySelected, setCitySelected] = useState(null);
    const [description, setDescription] = useState('');


    // Load cities once on component mount (when country is Vietnam)
    useEffect(() => {
        const citiesInVietnam = State.getStatesOfCountry("VN");

        // Filter out only cities (not districts or regions)
        setCities(citiesInVietnam);  // Set cities state
    }, []);

    // Handle city selection
    const handleCityChange = (e) => {
        setCitySelected(e.target.value); // Update the selected city
    }

    console.log(cities);  // This will log the list of cities in Vietnam

    return (
        <>
            <div className='w-full py-6 px-6'>
                <h2 className='font-[600] leading-[40px] text-gray-600 text-[36px]'>Create new hotel</h2>
            </div>
            <div className='w-full px-6'>
                <form className='w-full'>
                    <div className='mb-4 w-full flex flex-col '>
                        <p htmlFor="" className='font-[400] text-[25px]'>Name</p>
                        <p className='text-[16px] font-[400] text-gray-400'>Name of accommodation, should be short and catchy as in advertisement</p>
                        <input placeholder='Name' className='w-full px-4 py-2 border border-gray-400 rounded-3xl' />
                    </div>

                    <div className='mb-4 w-full flex items-center justify-between'>
                        <div className='w-[48%] flex flex-col '>
                            <p htmlFor="" className='font-[400] text-[25px]'>Type of Accommodation</p>
                            <p className='text-[16px] font-[400] text-gray-400'>Choose the type of accommodation, such as hotel, villa, guest house, ...</p>
                            <select defaultValue={"hotel"} className='w-full px-4 py-2 border border-gray-400 rounded-3xl'>
                                <option value="hotel">Hotel</option>
                                <option value="villa">Villa</option>
                                <option value="guest-house">Guest House</option>
                                <option value="apartment">Apartment</option>
                            </select>
                        </div>

                        <div className=' w-[50%] flex flex-col '>
                        <p htmlFor="" className='font-[400] text-[25px]'>City</p>
                        <p className='text-[16px] font-[400] text-gray-400'>Choose the city of your accomodation</p>
                        <select
                            value={citySelected}
                            onChange={handleCityChange}
                            className='w-full px-4 py-2 border border-gray-400 rounded-3xl'
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    </div>

                    <div className='mb-4 w-full flex flex-col '>
                        <p htmlFor="" className='font-[400] text-[25px]'>Address</p>
                        <p className='text-[16px] font-[400] text-gray-400'>Specific address of the building</p>
                        <input placeholder='Name' className='w-full px-4 py-2 border border-gray-400 rounded-3xl' />
                    </div>

                    <div className='mb-4 w-full flex flex-col '>
                        <p htmlFor="" className='font-[400] text-[25px]'>Photos</p>
                        <p className='text-[16px] font-[400] text-gray-400'>Specific address of the building</p>
                        <div className='flex justify-between'>
                            <input type="text" className=' w-[90%]  px-4 py-2 border border-gray-400 rounded-3xl' placeholder='Add using a link' name="" id="" />
                            <button className='flex items-center w-[9%]  bg-gray-400 rounded-2xl text-white justify-center '>Add photo</button>
                        </div>
                        <div className='grid mt-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4'>
                            <button className='border gap-2 bg-transparent rounded-2xl p-8 flex items-center gap-2 text-2xl text-gray-600'>
                                <IoCloudUploadOutline/>
                                Upload
                            </button>

                        </div>
                    </div>

                    <div className='mb-4 w-full flex flex-col '>
                        <p htmlFor="" className='font-[400] text-[25px]'>Description</p>
                        {/* <Editor
                            apiKey="izl72j5zg9fjcr0551e6p3vrd6gpctfwcer7okoq9iqtsxk4" // Optional: API key if you want to use TinyMCE Cloud
                            value={description}
                            onEditorChange={handleEditorChange}
                            init={{
                                height: 400,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code'
                            }}
                        /> */}
                    </div>

                   

                   
                </form>
            </div>
        </>
    )
}

export default AdminCreateHotel;
