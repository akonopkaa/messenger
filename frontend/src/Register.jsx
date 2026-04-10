import { useState } from "react"
import { useNavigate } from "react-router-dom"
import registerUser from "./API/register_user"

const Register = ({ setAuth }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [status, setStatus] = useState("typing")
    const [response, setResponse] = useState(null)
    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmationChange = (event) => {
        setConfirmation(event.target.value)
    }

    const handleSubmit = async (event) => {
        setResponse(null)
        event.preventDefault()
        setStatus("submitting")
        const result = await registerUser(username, email, password, confirmation)
        console.log(result)
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmation("")
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
                Register
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
                    type="email"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={handleEmailChange}
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
                    type="password"
                    name="confirmation"
                    value={confirmation}
                    placeholder="confirm password"
                    onChange={handleConfirmationChange}
                    disabled={status === "submitting"}
                >
                </input>
                <input
                    type="submit"
                    value="Register"
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

export default Register