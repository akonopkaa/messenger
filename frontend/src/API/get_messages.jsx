import axios from "axios"

const getMessages = async (username, offset = 0) => {
    try {
        const response = await axios.get(`http://localhost:8000/get_messages/${username}/`, {
            params: { offset: offset },
            withCredentials: true
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default getMessages