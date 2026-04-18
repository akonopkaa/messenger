import { useState, useEffect } from "react"
import getUsers from "./API/get_users"
import getMessages from "./API/get_messages"
import sendMessage from "./API/send_message"

const Chat = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers()
            if (response.success) {
                setUsers(response.data)
            } else {
                setError(response.message)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                const response = await getMessages(selectedUser.username)
                if (response.success) {
                    setMessages(response.data)
                } else {
                    setError(response.message)
                }
            }
            fetchMessages()
        }
    }, [selectedUser])

    const handleUserChange = (user) => {
        setSelectedUser(user)
    }

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value)
    }

    const handleSendMessage = async () => {
        const response = await sendMessage(selectedUser.username, newMessage)
        if (response.success) {
            setNewMessage("")
            const msgResponse = await getMessages(selectedUser.username)
            if (msgResponse.success) {
                setMessages(msgResponse.data)
            } else {
                setError(msgResponse.message)
            }
        } else {
            setError(response.message)
        }
    }

    const containerStyle = { display: "flex", height: "calc(100vh - 60px)" }
    const leftPaneStyle = { width: "30%", padding: "10px" }
    const rightPaneStyle = { width: "70%", padding: "10px", display: "flex", flexDirection: "column" }

    return (
        <div
            style={containerStyle}
        >
            <div
                style={leftPaneStyle}
            >
                <h2>
                    Users
                </h2>
                {error &&
                    <p
                        style={{ color: "red" }}>
                        {error}
                    </p>
                }
                <ul>
                    {users.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => handleUserChange(user)}
                            style={{
                                cursor: "pointer",
                                marginBottom: "10px",
                                fontWeight: selectedUser?.username === user.username ? "bold" : "normal"
                            }}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div
                style={rightPaneStyle}
            >
                <div
                    style={{ flexGrow: 1, overflowY: "auto" }}
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                        >
                            <strong>
                                {msg.sender}:
                            </strong>
                            <span>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleMessageChange}
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat