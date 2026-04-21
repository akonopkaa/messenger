import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Navbar, Nav, Button } from "react-bootstrap"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Logout from "./Logout.jsx"
import Chat from "./Chat.jsx"

axios.defaults.withCredentials = true

const App = () => {
  const [isAuth, setIsAuth] = useState(false)

  const handleLogout = async () => {
    const logout = await Logout()
    setIsAuth(!logout)
  }

  return (
    <BrowserRouter>
      <Navbar bg="white" className="border-bottom px-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Messenger
        </Navbar.Brand>
        <Nav className="ms-auto">
          {isAuth ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                Login
              </Button>
              <Button as={Link} to="/register" variant="primary">
                Register
              </Button>
            </>
          )}
        </Nav>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Chat />
            ) : (
              <h2 className="text-center mt-5 text-muted">Login or register to chat</h2>
            )
          }
        />
        <Route
          path="/login"
          element={<Login setAuth={setIsAuth} />}
        />
        <Route
          path="/register"
          element={<Register setAuth={setIsAuth} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App