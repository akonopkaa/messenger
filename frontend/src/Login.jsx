import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap"
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
        <Container
            className="my-5 p-4 border rounded bg-white"
            style={{ maxWidth: "400px" }}
        >
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        disabled={status === "submitting"}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        disabled={status === "submitting"}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={status === "submitting"}
                >
                    Login
                </Button>
            </Form>
            {response && (
                <p className="text-danger text-center mt-3 mb-0">
                    {response}
                </p>
            )}
        </Container>
    )
}

export default Login