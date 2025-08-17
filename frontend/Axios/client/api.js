import axios from "../axios.custom"

const registerUser = async (data) => {
    try {
        const URL_LOGIN = '/users/register'
        const response = await axios.post(URL_LOGIN, data, {
            withCredentials: true,
        });
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to register user"
        }
    }
}

const checkTokenOtp = async (data) => {
    try {
        const URL_LOGIN = '/users/checkOtp'
        const response = await axios.post(URL_LOGIN, data, { withCredentials: true })
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to verify OTP token"
        }
    }
}

const getUserApi = async () => {
    try {
        const URL_LOGIN = '/users/getuser'
        const response = await axios.get(URL_LOGIN, { withCredentials: true })
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch user data"
        }
    }
}

const loginApi = async (data) => {
    try {
        const URL_LOGIN = '/users/login'
        const response = await axios.post(URL_LOGIN, data, { withCredentials: true })
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to login user"
        }
    }
}

const createAdmin = async (data) => {
    try {
        const URL_LOGIN = '/admin/create'
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create admin"
        }
    }
}

const loginAdminApi = async (data) => {
    try {
        const URL_LOGIN = '/admin/login'
        const response = await axios.post(URL_LOGIN, data, { withCredentials: true })
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to login admin"
        }
    }
}

const getAdminApi = async () => {
    try {
        const URL_LOGIN = '/admin/getAdmin'
        const response = await axios.get(URL_LOGIN, { withCredentials: true })
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch admin data"
        }
    }
}

const getAllServicesApi = async () => {
    try {
        const URL_LOGIN = '/servicesHotel/get'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch all services"
        }
    }
}

const getAllFacilitiesApi = async () => {
    try {
        const URL_LOGIN = '/facilityHotel/get'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch all facilities"
        }
    }
}

const createServicesApi = async (data) => {
    try {
        const URL_LOGIN = '/servicesHotel/create'
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create service"
        }
    }
}

const deleteServicesApi = async (data) => {
    try {
        const URL_LOGIN = '/servicesHotel/delete/' + data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete service"
        }
    }
}

const editServicesApi = async (id, data) => {
    try {
        const URL_LOGIN = '/servicesHotel/edit/' + id
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update service"
        }
    }
}

const editFacilitiesApi = async (id, data) => {
    try {
        const URL_LOGIN = '/facilityHotel/edit/' + id
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update facility"
        }
    }
}

const createFacilitiesApi = async (data) => {
    try {
        const URL_LOGIN = '/facilityHotel/create'
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create facility"
        }
    }
}

const deleteFacilitiesApi = async (data) => {
    try {
        const URL_LOGIN = '/facilityHotel/delete/' + data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete facility"
        }
    }
}

const uploadByLinkApi = async (data) => {
    try {
        const URL_LOGIN = `/upload/upload-by-link`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to upload by link"
        }
    }
}

const uploadByFilesApi = async (data) => {
    try {
        const URL_LOGIN = `/upload/upload-by-files`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to upload files"
        }
    }
}

const createHotelApi = async (data) => {
    try {
        const URL_LOGIN = `/hotels/create`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create hotel"
        }
    }
}

const deleteHotelApi = async (id) => {
    try {
        const URL_LOGIN = `/hotels/delete/` + id
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete hotel"
        }
    }
}

const getAllHotelApi = async () => {
    try {
        const URL_LOGIN = `/hotels/getAll`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch all hotels"
        }
    }
}

const getAllRoomApi = async () => {
    try {
        const URL_LOGIN = `/rooms/getAll`
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch all rooms"
        }
    }
}

const updateHotelApi = async (data) => {
    try {
        const URL_LOGIN = `/hotels/update`
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update hotel"
        }
    }
}

const createRoomApi = async (data) => {
    try {
        const URL_LOGIN = `/rooms/create`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create room"
        }
    }
}

const deleteRoomApi = async (id, hotelId) => {
    try {
        const URL_LOGIN = `/rooms/delete/` + id + "/" + hotelId
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete room"
        }
    }
}

const updateRoomApi = async (data, id) => {
    try {
        const URL_LOGIN = `/rooms/edit/${id}`
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update room"
        }
    }
}

const getPolicyApi = async (data) => {
    try {
        const URL_LOGIN = `/policy/get`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch policy"
        }
    }
}

const createPolicyApi = async (data) => {
    try {
        const URL_LOGIN = `/policy/create`
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create policy"
        }
    }
}

const deletePolicyApi = async (data) => {
    try {
        const URL_LOGIN = '/policy/delete/' + data
        const response = await axios.delete(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete policy"
        }
    }
}

const editPolicyApi = async (id, data) => {
    try {
        const URL_LOGIN = '/policy/edit/' + id
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update policy"
        }
    }
}

const createOtpPayment = async (data) => {
    try {
        const URL_LOGIN = '/booking/create'
        const response = await axios.post(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to create OTP payment"
        }
    }
}

const getBookingApi = async (id) => {
    try {
        const URL_LOGIN = '/booking/get/' + id
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch booking"
        }
    }
}

const updateBookingApi = async (id, data) => {
    try {
        const URL_LOGIN = '/booking/update/' + id
        const response = await axios.patch(URL_LOGIN, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update booking"
        }
    }
}

const updateStatusBookingApi = async (id) => {
    try {
        const URL_LOGIN = '/booking/updateStatus/' + id
        const response = await axios.patch(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to update booking status"
        }
    }
}

const getBookingByEmailApi = async (email) => {
    try {
        const URL_LOGIN = '/booking/getByEmail/' + email
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch bookings by email"
        }
    }
}

const getAllBookingApi = async () => {
    try {
        const URL_LOGIN = '/booking/getAll'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch all bookings"
        }
    }
}

const getPayPalClientApi = async () => {
    try {
        const URL_LOGIN = '/config/paypal'
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch PayPal client configuration"
        }
    }
}

const busAdminApi = async (path, method, payload = {}) => {
    try {
        const URL_LOGIN = '/bus/admin/' + path  
        const response = await axios[method](URL_LOGIN, payload, { withCredentials: true })        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch bus data"
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
    getAllBookingApi,
    updateStatusBookingApi,
    busAdminApi
}