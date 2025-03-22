import { createHotelApi, getAllHotelApi } from "../../../Axios/client/api"

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
