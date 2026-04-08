import axios from "axios"

const registerUser = async (username, email, password, confirmation) => {
    try {
        const response = await axios.post("http://localhost:8000/register/", {
            username: username,
            email: email,
            password: password,
            confirmation: confirmation
        })
        console.log(response.data.message)
        return response.data.message
    } catch (error) {
        console.error(error.response?.data.message)
        return error.response?.data.message
    }
}

export default registerUser