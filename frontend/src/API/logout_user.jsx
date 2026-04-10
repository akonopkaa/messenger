import axios from "axios"

const logoutUser = async () => {
    try {
        const response = await axios.post("http://localhost:8000/logout/")
        return { success: true, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default logoutUser