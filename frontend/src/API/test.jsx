import axios from "axios";

async function test() {
    try {
        const response = await axios.get("http://localhost:8000/test/")
        console.log(response.data)
        return response.data
    } catch {
        console.error(error)
    }
}

export default test;