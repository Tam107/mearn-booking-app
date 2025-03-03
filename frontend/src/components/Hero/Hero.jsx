import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <>
        <div className='w-11/12 mx-auto'>
            <div className='w-9/11 mx-auto'>
                <div className='w-full aspect-[4/3] relative pt-10 pb-14'>
                    <div className='flex h-full gap-10 items-start justify-between'>
                        <div className='1 flex flex-col gap-6 pt-11 w-[40%]'>
                            <h2 className='font-[500] text-[72px] leading-[80px] text-[#111827]'>Highlights of Vietnam</h2>
                            <p className='font-[400] text-[18px] leading-[28px] text-[#6B7280]'>Accompanying us, you have a trip full of experiences. With us, booking accommodation, hotels, cruises, train, bus ticket</p>
                            <div className='py-[13px] gap-[10px] font-[500] text-[16px] leading-[24px] w-fit text-white px-[25px] rounded-full flex items-center justify-center bg-[#4F46E5]'><CiSearch size={25} color='white'/>
                            Start your search</div>
                        </div>
                        <div className='w-[60%] h-full gap-4 flex justify-between'>
                            <div className='flex w-[50%] pb-10 justify-between flex-col gap-4'>
                                <img className='object-cover h-[50%] w-full ' src="https://s3-alpha-sig.figma.com/img/f94f/883e/52efc69f0b5c2a1adad3ce755867e62a?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KX3IFspU3RnfkAa4mSRSCf6xoackrKCuSi7oQ3y30AUWGymoY1a7novrgm2YytUmgTdF5id7BTOaG-jcehRpH5-R-RaP6hR3rrLInWVQw8dvqLr~iWzVuW7~yM8hpkOsQxMnnVTC78uaJG8qGYBHX6rMXCrYAv~d0G2zZjQ3PLtiKL5YhofehM9m5wI3bjUMPDQeWdriMNDSQ~9uHICw7P-63yKUNgR4AIkhDgMBbtcVzUhJtJwnDQOkk-sJ99KHuSXs8Yehsuxyjz8L1xXwhqM0K0ekTMOdwDmu4HnOs2DAXJItSYe4k3O40-O3nzJfq8wj1NvDmfjC4piX5lpCcA__" alt="" />
                                <img className='object-cover h-[50%] w-full ' src="https://s3-alpha-sig.figma.com/img/5923/7610/d708c24de25fb990425147fc652b611e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CkjKNKPHeQmWH77oFdp2sCOBdGagbicoPMSDnIur9EG9D7H3cXO1kK0Tg5pI8GGbpG0bH17HHV2ZhuIPq~ePZtoPJk8MuFB1Z8NGvsg-23d4Qmy8WP81m45BrLYCBjVARyVHi3IRHCEcTjgTBbGL7uscl0cUXzvcI~LMn~~sDYiTp660tTJJJ4ixS5gqesH~HceRXfPQeW52HgkkHZ5RuxjQRk8pq~8fgkWPouU-QQZBgGgWdJog5oSZByNsrpHMwhkpVGPhYiFAD2nKuyHWpElzggGEoCmM22iEB8a5mnkLtQ4Nt0CcqBigAVrqTCZzZx67ADwHaKZR1b4yTIjjdQ__" alt="" />
                            </div>
                            <div className='w-[50%] h-[100%] relative'>
                                <img className='object-cover w-full h-[80%] absolute bottom-0' src="https://s3-alpha-sig.figma.com/img/5bcf/6ba0/bd86f76521827c1e8e704fe0def314bb?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=o~~WlCxqlVdyz5CNTkVKIclONUAWoPmz4nSCdQLrsT4YZTCwEkkCAi0lIcY9eSSqvlRKy9wfglTZIGvHJuJcqhwLOmwclSe73iH-Y~KX2szFjKQCb9g5offnNDuaN8LWRfykFLAO~Ks7nZCGqtzDpIPhbvvAhxpd5u-t1FIT~eLW1b6-KI8LNTWCbmHYKuzaJZhAX6TKGneoSeY1PIGUMJAJzyXBvGMzFgBL72L9dKEwpnHroDrGpmjVvCenOBKU5BfRTr53NYjUPFPJdX~EGG~QKmAMN4jCNTFQveI7JCOYARvMXWRFtPHkGdh8FpnHIAwtbLkmrTpqJTGdT4NUGA__" alt="" />
                            </div>
                        </div>  
                    </div>
                    <div className='absolute bottom-16 left-0 w-full'>
                        <div className='flex w-[30%] flex-row-reverse gap-4 items-center '>
                            <div><p className='text-[#9CA3AF] font-medium text-[16px] leading-[24px]'>Rental car</p></div>
                            <div><p className='text-[#9CA3AF] font-medium text-[16px] leading-[24px]'>Experiences</p></div>
                            <div className='flex gap-1 items-center justify-between'> <div className='w-[10px] h-[10px] rounded-full bg-black'></div><p className='text-[#1F2937] font-medium text-[16px] leading-[24px]'>Stays</p></div>

                        </div>
                        <br />
                        <div className='w-full'>
                            <div className='w-[90%] py-2 pr-3 flex items-center rounded-[130px] px-1 shadow-lg bg-[#FFFFFFCC]'>
                               <div className='flex-1 flex items-center justify-between'>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiLocationOn color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>Location</h2>
                                                <p className='text-[#9CA3AF] font-[400] text-[14px] leading-[14px]'>Where are you going?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiCalendarDate color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>Check in</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF]'>Add date</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <CiCalendarDate color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>Check out</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF]'>Add date</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-[25%] items-center justify-center'>
                                        <div className='flex items-center gap-3.5'>
                                            <IoPersonAddOutline color='#D1D5DB' size={25}/>
                                            <div className='flex flex-col gap-1'>
                                                <h2 className='font-[600] text-[18px] leading-[28px]'>Guests</h2>
                                                <p className='font-[400] text-[14px] leading-[14px] text-[#9CA3AF] '>Add guests</p>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                               <div className='bg-[#4F46E5] w-[48px] h-[48px] shadow-sm rounded-full flex items-center justify-center z-50'><CiSearch color='white' size={25}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}

export default Hero
