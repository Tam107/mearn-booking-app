import axios from "../axios.custom"
const registerUser = async(data)=>{
    try {
        const URL_LOGIN ='/users/register'
        const response = await axios.post(URL_LOGIN, data, {
            withCredentials: true,  // Đảm bảo gửi cookie
        });
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}
const checkTokenOtp = async(data)=>{
    try {
        const URL_LOGIN ='/users/checkOtp'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}
const getUserApi =async ()=>{
    try {
        const URL_LOGIN ='/users/getuser'
        const response = await axios.get(URL_LOGIN,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const loginApi = async(data)=>{
    try {
        const URL_LOGIN ='/users/login'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})

        return response
        
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const createAdmin = async(data)=>{
    try {
        const URL_LOGIN ='/admin/create'
        const response = await axios.post(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const loginAdminApi = async(data)=>{
    try {
        const URL_LOGIN ='/admin/login'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getAdminApi = async()=>{
    try {
        const URL_LOGIN ='/admin/getAdmin'
        const response = await axios.get(URL_LOGIN,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const getAllServicesApi = async()=>{
    try {
        const URL_LOGIN ='/servicesHotel/get'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}


const getAllFacilitiesApi = async()=>{
    try {
        const URL_LOGIN ='/facilityHotel/get'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const createServicesApi = async(data)=>{
    try {
        const URL_LOGIN ='/servicesHotel/create'
        const response = await axios.post(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const deleteServicesApi = async(data)=>{
    try {
        const URL_LOGIN ='/servicesHotel/delete/'+ data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const editServicesApi = async(id,data)=>{
    try {
        const URL_LOGIN ='/servicesHotel/edit/'+ id
        const response = await axios.patch(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const editFacilitiesApi = async(id,data)=>{
    try {
        const URL_LOGIN ='/facilityHotel/edit/'+ id
        const response = await axios.patch(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const createFacilitiesApi = async(data)=>{
    try {
        const URL_LOGIN ='/facilityHotel/create'
        const response = await axios.post(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const deleteFacilitiesApi = async(data)=>{
   
    try {
        const URL_LOGIN ='/facilityHotel/delete/'+ data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const uploadByLinkApi = async(data)=>{
    try {
        const URL_LOGIN =`/upload/upload-by-link`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        console.log(response);
        
        
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const uploadByFilesApi = async(data)=>{
    try {
        const URL_LOGIN =`/upload/upload-by-files`
        console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        console.log(response);
            
        
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const createHotelApi = async(data)=>{
    try {
        const URL_LOGIN =`/hotels/create`
        console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        console.log(response);
            
        
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const deleteHotelApi = async(id)=>{
    try {
        const URL_LOGIN =`/hotels/delete/`+id
        const response = await axios.delete(URL_LOGIN)   
        console.log(response);
        
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getAllHotelApi = async()=>{
    try {
        const URL_LOGIN =`/hotels/getAll`
        const response = await axios.get(URL_LOGIN)
        
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getAllRoomApi = async()=>{
    try {
        const URL_LOGIN =`/rooms/getAll`
        const response = await axios.get(URL_LOGIN)
     
        return response
    } catch (error) {
        
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const updateHotelApi = async(data)=>{
    try {
        const URL_LOGIN =`/hotels/update`
        const response = await axios.patch(URL_LOGIN,data)
        console.log(response);
        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const createRoomApi = async(data)=>{
    try {
        const URL_LOGIN =`/rooms/create`
        const response = await axios.post(URL_LOGIN,data)
        // console.log(response);
        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const deleteRoomApi = async(id,hotelId)=>{
    try {
        const URL_LOGIN =`/rooms/delete/`+id+"/"+hotelId
        
        const response = await axios.delete(URL_LOGIN)
        // console.log(response);
        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const updateRoomApi = async(data,id)=>{
    try {
        const URL_LOGIN =`/rooms/edit/${id}`
        const response = await axios.patch(URL_LOGIN,data)
        // console.log(response);
        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const getPolicyApi = async(data)=>{
    try {
        const URL_LOGIN =`/policy/get`
        // console.log(data,"backend");
        
        const response = await axios.post(URL_LOGIN,data)
     
        return response
    } catch (error) {
        
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const createPolicyApi = async(data)=>{
    try {
        const URL_LOGIN =`/policy/create`
        const response = await axios.post(URL_LOGIN,data)
     
        return response
    } catch (error) {
        
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const deletePolicyApi = async(data)=>{
   
    try {
        const URL_LOGIN ='/policy/delete/'+ data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const editPolicyApi = async(id,data)=>{
   
    try {
        const URL_LOGIN ='/policy/edit/'+ id
        const response = await axios.patch(URL_LOGIN,data)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const createOtpPayment = async(data)=>{
   
    try {
        const URL_LOGIN ='/booking/create'
        const response = await axios.post(URL_LOGIN,data)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getBookingApi = async(id)=>{
   
    try {
        const URL_LOGIN ='/booking/get/'+id
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const updateBookingApi = async(id,data)=>{
   
    try {
        const URL_LOGIN ='/booking/update/'+id
        const response = await axios.patch(URL_LOGIN,data)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const updateStatusBookingApi = async(id)=>{
   
    try {
        const URL_LOGIN ='/booking/updateStatus/'+id
        const response = await axios.patch(URL_LOGIN)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getBookingByEmailApi = async(email)=>{
   
    try {
        const URL_LOGIN ='/booking/getByEmail/'+email
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getAllBookinglApi = async(email)=>{
   
    try {
        const URL_LOGIN ='/booking/getAll'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}

const getPayPalClientApi = async()=>{
   
    try {
        const URL_LOGIN ='/config/paypal'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}


export {
    registerUser,
    checkTokenOtp,
    getUserApi,
    loginApi,
    createAdmin,
    loginAdminApi,
    getAdminApi,
    getAllServicesApi,
    uploadByLinkApi,
    uploadByFilesApi,
    createHotelApi,
    getAllHotelApi,
    getAllRoomApi,
    createServicesApi,
    deleteHotelApi,
    updateHotelApi,
    getAllFacilitiesApi,
    createFacilitiesApi,
    createRoomApi,
    updateRoomApi,
    getPolicyApi,
    createPolicyApi,
    deleteServicesApi,
    editServicesApi,
    deleteRoomApi,
    deleteFacilitiesApi,
    editFacilitiesApi,
    deletePolicyApi,
    editPolicyApi,
    createOtpPayment,
    getBookingApi,
    updateBookingApi,
    getPayPalClientApi,
    getBookingByEmailApi,
    getAllBookinglApi,
    updateStatusBookingApi
}