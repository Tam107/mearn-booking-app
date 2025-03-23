import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { useParams } from 'react-router';
const AdminViewRoomDetail = () => {
    const { slug } = useParams();  // Get the slug parameter from the URL

    const stateRooms =useSelector(state=>state.RoomReducer);
    const [data,setData] = useState({})
    useEffect(()=>{
        const tmp = stateRooms?.rooms?.find(i=>i.slug===slug)
        setData(tmp)
    },[stateRooms?.rooms,slug])
    console.log(data);
    
  return (
    <>
         <div className="w-full py-6 px-6">
            <h2 className="font-[600] leading-[40px] text-gray-600 text-[36px]">
                {data?.hotel?.name}
            </h2>
         </div>
    </>
  )
}

export default AdminViewRoomDetail
