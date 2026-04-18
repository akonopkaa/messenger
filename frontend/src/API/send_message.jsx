import axios from "axios"

const sendMessage = async (receiver, content) => {
    try {
        const response = await axios.post("http://localhost:8000/send_message/", {
            receiver: receiver,
            content: content
        }, {
            withCredentials: true
        })
        return { success: true, message: response.data.message }
    } catch (error) {
        return { success: false, message: error.response?.data.message }
    }
}

export default sendMessage