import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
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
      <nav>
        {isAuth ? (
          <>
            <Link
              to="/"
            >
              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
            >
              <button>
                Login
              </button>
            </Link>
            <Link
              to="/register"
            >
              <button>
                Register
              </button>
            </Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Chat /> : <h2>Login or register</h2>}
        />
        <Route
          path="/login"
          element={<Login
            setAuth={setIsAuth}
          />}
        />
        <Route
          path="/register"
          element={<Register
            setAuth={setIsAuth}
          />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App