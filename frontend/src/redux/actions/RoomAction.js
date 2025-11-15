


import { getAllRoomApi } from "../../../Axios/client/api"


export const getAllRoomsAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllRoomRequest",

        })
        const data = await getAllRoomApi()
        
        if(data.success){            
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
        if(room){
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
