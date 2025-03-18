import React from 'react'
import { MdApps } from "react-icons/md";

const ImageHotel = () => {
  return (
    <>
        <div className='w-full h-[400px] grid grid-cols-2 gap-[8px]' >
            <div className=' h-full'>
              <img className='rounded-tl-[16px] rounded-bl-[16px] object-cover h-full w-full' src="https://s3-alpha-sig.figma.com/img/33e7/8912/bbfb42ca5051f5492bcbda4a216dccc6?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iuBnOsZPR50lxHQ0iJJLyx2FE7hWqap3GSwdBX1Bs5lBW4yUCrYc14Mn32N34sw81ffZpInYCERigl507vUfMO9E0l19ihCBOO-gxn5~RLcUiNXfFHjvV7WucxKnryk3i4hXs9wptIISIhyCIOAagWD8z9C5LkksdJT8OEkmj3ei4qMuq6jpH2eN8CIgoBwDdHi8Jeq9laLmsvcyNuTpuEOp7P0p03tfLeQ4SKkUsPpIKPbKSuwSIUSo8rmRs52MaNoKrc7Rqp6x1uQQa18Ux-PJDjiV42a1Vkl41akt1PvdWvoqM7nzObmhFJI8hP4CpWC5YEEyiCFEGolaNANbdA__" alt="" />
            </div>
            <div className=' h-full grid grid-rows-2 gap-[8px]'>
              <div className='w-full  grid grid-cols-2 gap-[8px]'>
                  <img className='object-cover h-full' src="https://s3-alpha-sig.figma.com/img/7e95/b547/ccb35f41cb8bca5561addab0467b9ce5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AuXANtIT94HMXwox1AeseCtl34UBYHxEU6jOKB-kG8tjGDKYts7wiytpW0kjGk2tFqByx6BJ-OIU0HZIy1r5ddHPZOtq9FvMmSGYsCQBzz3qYuhiNh6ovlUgPCQ0vjKeiGaK1ehJnTCIqrS8yuz2SPA3xmBg1S8rXcQq4puqroq0hEhyrT6y0JODOm9kjlWvYRB2hr0Q9kzsmHOHopwCX7wWx7CfVTwjjTd8gTpc6VwkjSfbE9Mly8VLcYWs7L5eCqEHxE5JKm6mLEf5-ALekff0A8Ndx8WycUqwR1eJKPM9uL~Zj2vzOMoVCgzqzxUomznKgoTZwg1XCbAYfLY4tQ__" alt="" />
                  <img className='object-cover h-full rounded-tr-[16px]' src="https://s3-alpha-sig.figma.com/img/9c03/7428/fcc8ee64fe9d947569d78c1eb2e26259?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rWUGK9W1LKQC7JhfrDqEJbjatZdyoXdHxZxr5r1mcPMJY3ZZ0iCcWl5--hf90dMA07hjJqJ8LmGsHvPlZwYZ2Y6bPkTOLQB4OLS8f4YvKqfyB7jkPcFKL6HQZwOkIcdxIgy42qbmBs9BUFfxqV6ipJPP-tkV2eVBstYECBFKZerVhQO6ce5YvAUSN9vpXEOtmU~0m9AZ-ZTC5ympBpjgWrRAz3UOP6BQKiO77k1JCQA4AfTcsi02qPeU4UAFL4Y7JCB9OFjfbH6XAUQ7UiZH5VjkxBoA~g9QG3kM-GM9946tUhinDkXNIGVSg72imylRDxNMMLKSDBXsgdwZ7xB-kA__" alt="" />
              </div>
              <div className='w-full  grid grid-cols-2 gap-[8px]'>
                  <img className='object-cover h-full' src="https://s3-alpha-sig.figma.com/img/079e/23bf/4bb90ff22235b7665fc3ca85d2c34b28?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tDkWDVRfv4UFO9toWRFwnpXp02gAJ~wsjnZHKm82JiBHF0SVVv0IWtJtmYUF5Pa6PP5AQcZyqMsoAW2gBHp9SZDPm1Ot6ZkM54aT6d8glG1eRLU5dyi8X-QKBDjbBkVskk7DogVZjAjUHiaAAuImAul-zDIvQKt6N2HcHuLCV7WQhK6hxDFTfK-lrlqr97CoHgvmmz4zXNedXxAqCGqeyPq1sTceIjOX8dfnEqvnbt6xtz8srEXkGf4N5u4u0y~0~pVJk~HMcGgv90GwXU7XMJB~A71-cdKOkGOovMzgEqrEV65~IwOVErJOlCOcdV2n5XEN7ayB3CCN6s2OcuNRxg__" alt="" />
                  <div className='relative h-full'>
                    <img className='object-cover h-full rounded-br-[16px]' src="https://s3-alpha-sig.figma.com/img/5297/e89b/bda05c1478e165e64250f76d43531d98?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EcEL22daJssGjhK97S6vFL4sl30RD8fmxHjjWQYDtxmGJT6-9lomVbn4Sg~QBoZ1PGNEl~fMBymXcZBQZ7fl756vFfXeICfrULooSUDHdb0Xlt1kvkbZOeZajx6PdwfTIh3Brwq3jwKI3gADgynDHyABHVIl9Xelq62F8DcjJOglyPvlAiDckbxZ9DrAH4~3Y-X-EUqXMTNzHjTKbBR~4OdDvN5hP8O8k4KbWUrQACATZ04fmpFknWupeAWKsHd3pcf~SwbOCElzgbkggBBB3lbRoxaEDOJLcioIBQjMzoS-7rtD71JCcP8EZca1jyr~ar0LULAcpgrUIImFQbPjCA__" alt="" />
                    <div className=' py-2 px-4 bg-white shadow-md border right-4 bottom-3 absolute rounded-xl flex items-center justify-center gap-2'><MdApps size={15}/>
                    <p className='font-[500] text-[14px] leading-[20px]'>Show all photos</p></div>
                  </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default ImageHotel
