import axios from "axios"

const loginUser = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:8000/login/", {
            username: username,
            password: password,
        })
        console.log(response.data.message)
        return response.data.message
    } catch (error) {
        console.error(error.response?.data.message)
        return error.response?.data.message
    }
}

export default loginUser