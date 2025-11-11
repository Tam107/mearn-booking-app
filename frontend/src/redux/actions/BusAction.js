import { busAdminApi } from "../../../Axios/client/api";

export const getAllBoardingPointAdminAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllBoardingAdminRequest",
        })
        const data = await busAdminApi("boarding-points","get");
        if(data.success){
            dispatch({
                type:"getAllBoardingAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"getAllBoardingAdminFailed",
            payload:"Error when get",

        })
       }
    } catch (error) {
        dispatch({
            type:"getAllBoardingAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const getAllArrivalPointAdminAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllArrivalAdminRequest",
        })
        const data = await busAdminApi("arrival-points","get");
        if(data.success){
            dispatch({
                type:"getAllArrivalAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"getAllArrivalAdminFailed",
            payload:"Error when get",

        })
       }
    } catch (error) {
        dispatch({
            type:"getAllArrivalAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}
export const addBoardingPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"addBoardingAdminRequest",
        })
        const data = await busAdminApi("create-point","post",payload);
        if(data.success){

            dispatch({
                type:"addBoardingAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"addBoardingAdminFailed",
            payload:"Error when add",

        })
       }
    } catch (error) {
        dispatch({
            type:"addBoardingAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}
export const addArrivalPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"addArrivalAdminRequest",
        })
        const data = await busAdminApi("createPoint","post",payload); 
        if(data.success){

            dispatch({
                type:"addArrivalAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"addArrivalAdminFailed",
            payload:"Error when add",

        })
       }
    } catch (error) {
        dispatch({
            type:"addArrivalAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const deleteBoardingPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteBoardingAdminRequest",
        })
        const data = await busAdminApi(`point/${payload}`,"delete");
        if(data.success){
            
            dispatch({
                type:"deleteBoardingAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"deleteBoardingAdminFailed",
            payload:"Error when deleting",

        })
       }
    } catch (error) {
        dispatch({
            type:"deleteBoardingAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}
export const deleteArrivalPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteArrivalAdminRequest",
        })
        const data = await busAdminApi(`deletePoint/${payload}`,"delete"); 
        if(data.success){
            
            dispatch({
                type:"deleteArrivalAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"deleteArrivalAdminFailed",
            payload:"Error when deleting",

        })
       }
    } catch (error) {
        dispatch({
            type:"deleteArrivalAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const updateBoardingPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateBoardingAdminRequest",
        })
        const data = await busAdminApi(`updatePoint/${payload._id}`,"patch",payload); 
        if(data.success){   
            dispatch({
                type:"updateBoardingAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"updateBoardingAdminFailed",
            payload:"Error when updating",

        })
       }
    } catch (error) {
        dispatch({
            type:"updateBoardingAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}
export const updateArrivalPointAdminAction = (payload)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateArrivalAdminRequest",
        })
        const data = await busAdminApi(`point/${payload._id}`,"patch",payload);
        if(data.success){   
            dispatch({
                type:"updateArrivalAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"updateArrivalAdminFailed",
            payload:"Error when updating",

        })
       }
    } catch (error) {
        dispatch({
            type:"updateArrivalAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const createBusAdminAction = (data)=>async(dispatch)=>{
    try {
        dispatch({
            type:"createBusAdminRequest",
        })
        if(data.success){   
            dispatch({
                type:"createBusAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"createBusAdminFailed",
            payload:"Error when creating bus",
            errorCreate:data.message
        })
       }
    } catch (error) {
        dispatch({
            type:"createBusAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",
            errorCreate:error?.response?.data?.message || "Error in axios"
        })
    }
}

export const getAllBusesAdminAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllBusesAdminRequest",
        })
        const data = await busAdminApi("buses","get");
        if(data.success){
            dispatch({
                type:"getAllBusesAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"getAllBusesAdminFailed",
            payload:"Error when get",

        })
       }
    } catch (error) {
        dispatch({
            type:"getAllBusesAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}

export const deleteBusAction = (id)=> async(dispatch)=>{
    try {
        dispatch({
            type:"deleteBusRequest",
        })
        const data = await busAdminApi("buses/" +id,"delete");
        if(data.success){
            dispatch({
                type:"deleteBusSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"deleteBusFailed",
            payload:"Error when delete",
        })
       }
    } catch (error) {
        dispatch({
            type:"deleteBusFailed",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }

}

export const updateBusAction = (data)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateBusAdminRequest",
        })
        if(data.success){   
            dispatch({
                type:"updateBusAdminSuccess",
                payload:data.data
            })
        } 
       else{
        dispatch({
            type:"updateBusAdminFailed",
            payload:"Error when update bus",
            // errorCreate:data.message
        })
       }
    } catch (error) {
        dispatch({
            type:"updateBusAdminFailed",
            payload:error?.response?.data?.message||"Error in axios",
            errorCreate:error?.response?.data?.message || "Error in axios"
        })
    }
}