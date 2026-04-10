import axios from "axios"

const loginUser = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:8000/login/", {
            username: username,
            password: password,
        })
        return { success: true, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default loginUser