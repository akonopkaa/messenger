import { useState } from "react"
import { useNavigate } from "react-router-dom"
import loginUser from "./API/login_user"

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("typing")
    const [response, setResponse] = useState(null)
    const navigate = useNavigate()

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
        setUsername("")
        setPassword("")
        if (result.success) {
            setAuth(true)
            navigate("/")
        } else {
            setResponse(result.message)
            setStatus("typing")
        }
    }

    return (
        <div>
            <h2>
                Login
            </h2>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="username"
                    onChange={handleUsernameChange}
                    disabled={status === "submitting"}
                >
                </input>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={handlePasswordChange}
                    disabled={status === "submitting"}
                >
                </input>
                <input
                    type="submit"
                    value="Login"
                    disabled={status === "submitting"}
                >
                </input>
            </form>
            {response &&
                <p>
                    {response}
                </p>
            }
        </div>
    )
}

export default Login