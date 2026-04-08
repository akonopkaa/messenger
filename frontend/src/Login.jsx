import { useState } from "react"
import loginUser from "./API/login_user"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("typing")
    const [response, setResponse] = useState(null)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        setResponse(null)
        event.preventDefault()
        setStatus("submitting")
        const result = await loginUser(username, password)
        console.log(result)
        setResponse(result)
        setStatus("typing")
        setUsername("")
        setPassword("")
    }

    return (
        <div>
            <h2>
                Login
            </h2>
            <form
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="username"
                    onChange={handleUsernameChange}
                    disabled={status === "submitting"}>
                </input>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={handlePasswordChange}
                    disabled={status === "submitting"}>
                </input>
                <input
                    type="submit"
                    value="Login"
                    disabled={status === "submitting"}>
                </input>
            </form>
            {response && <p>{response}</p>}
        </div>
    )
}

export default Login