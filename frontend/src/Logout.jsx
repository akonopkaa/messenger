import logoutUser from "./API/logout_user.jsx"

const Logout = async () => {
    const result = await logoutUser()
    console.log(result)
    return true
}

export default Logout