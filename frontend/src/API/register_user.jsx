import axios from "axios"

const registerUser = async (username, email, password, confirmation) => {
    try {
        const response = await axios.post("http://localhost:8000/register/", {
            username: username,
            email: email,
            password: password,
            confirmation: confirmation
        })
        return { success: true, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default registerUser