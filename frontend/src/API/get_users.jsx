import axios from "axios"

const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8000/get_users/", {
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default getUsers