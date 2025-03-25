import toast from "react-hot-toast"
import { createHotelApi, deleteHotelApi, getAllHotelApi, getAllRoomApi, updateHotelApi } from "../../../Axios/client/api"

export const createHotelAction = (hotelData)=>async(dispatch)=>{
    try {
        dispatch({
            type:"hotelCreateRequest",

        })
        const data = await createHotelApi(hotelData)
  
        if(data.success){
            // console.log(1);
            dispatch({
                type:"hotelCreateSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"hotelCreateFailed",
            payload:"Error when create",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"hotelCreateFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}


export const getAllHotelsAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllHotelRequest",

        })
        const data = await getAllHotelApi()
  
        if(data.success){
            // console.log(1);
            dispatch({
                type:"getAllHotelSucess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"getAllHotelFailed",
            payload:"Error when create",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"getAllHotelFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}


export const deleteHotelAction = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteHotelRequest",

        })
        const data = await deleteHotelApi(id)
  
        if(data.success){
           
            dispatch({
                type:"deleteHotelSuccess",
                payload:data.data
            })

            if(data?.rooms?.length>0){
                dispatch({
                    type:"deleteRoomSuccess",
                    payload:data.rooms
                })
            }
        } 
       else{
        dispatch({
            type:"deleteHotelFailed",
            payload:"Error when create",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"deleteHotelFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const updateHotelAction = (hotelData)=>async(dispatch)=>{
        try {
            dispatch({
                type:"updateHotelRequest",
    
            })
            const data = await updateHotelApi(hotelData)
            if(data.success){
                dispatch({
                    type:"updateHotelSuccess",
                    payload:data.data
                })
                toast.success('Hotel updated successfully!');
            }
              else{
                dispatch({
                    type:"updateHotelFailed",
                    payload:"Error when update hotel",
    
                })
                toast.error('Hotel updated failed!');

            }
            
        } catch (error) {
            dispatch({
                type:"updateHotelFailed",
                payload:error?.response?.data?.message||"Error in axios",
    
            })
        }
    
    
    
}