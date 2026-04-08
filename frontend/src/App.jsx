import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import axios from "axios"
import Login from "./Login.jsx"
import Register from "./Register.jsx"

axios.defaults.withCredentials = true

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App