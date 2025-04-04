
// export const createHotelAction = (hotelData)=>async(dispatch)=>{
//     try {
//         dispatch({
//             type:"hotelCreateRequest",

import { getAllRoomApi } from "../../../Axios/client/api"

//         })
//         const data = await createHotelApi(hotelData)
  
//         if(data.success){
//             // console.log(1);
//             dispatch({
//                 type:"hotelCreateSuccess",
//                 payload:data.data
//             })
//         } 
//        else{
//         dispatch({
//             type:"hotelCreateFailed",
//             payload:"Error when create",

//         })
//        }
        
//     } catch (error) {
//         dispatch({
//             type:"hotelCreateFailed",
//             payload:error?.response?.data?.message||"Error in axios",

//         })
//     }
// }


export const getAllRoomsAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllRoomRequest",

        })
        const data = await getAllRoomApi()
     
        
        if(data.success){
   
            
            // console.log(1);
            dispatch({
                type:"getAllRoomSucess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"getAllRoomFailed",
            payload:"Error when create",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"getAllRoomFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const updateRoomsListAction = (room)=>async(dispatch)=>{
    try {
       
        console.log(room);
        
        if(room){
            console.log("ok");
            
            // console.log(1);
            dispatch({
                type:"roomUpdateListSuccess",
                payload:room
            })
        } 
       else{
        dispatch({
            type:"roomCreateFailed",
            payload:"Error when create",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"roomUpdateListFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}
