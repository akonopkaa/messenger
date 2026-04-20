import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import getUsers from "./API/get_users"
import getMessages from "./API/get_messages"
import sendMessage from "./API/send_message"

const Chat = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [error, setError] = useState("")
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false)

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
            setOffset(0)
            const fetchMessages = async () => {
                const response = await getMessages(selectedUser.username, 0)
                if (response.success) {
                    setMessages(response.data)
                    setHasMore(response.data.length === 10)
                    setError("")
                } else {
                    setMessages([])
                    setHasMore(false)
                    setError(response.message)
                }
            }
            fetchMessages()
        }
    }, [selectedUser])

    useEffect(() => {
        if (!selectedUser) return;
        const interval = setInterval(async () => {
            if (offset === 0) {
                const response = await getMessages(selectedUser.username, 0)
                if (response.success) {
                    setMessages(response.data)
                }
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [selectedUser, offset])

    const handleLoadMore = async () => {
        if (!selectedUser) return
        const newOffset = offset + 10
        const response = await getMessages(selectedUser.username, newOffset)
        if (response.success) {
            setMessages(response.data.concat(messages))
            setOffset(newOffset)
            setHasMore(response.data.length === 10)
        } else {
            setError(response.message)
        }
    }

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
                setOffset(0)
                setHasMore(msgResponse.data.length === 10)
            } else {
                setError(msgResponse.message)
            }
        } else {
            setError(response.message)
        }
    }

    return (
        <Container
            className="my-3 border rounded p-0"
            style={{ height: "calc(100vh - 100px)", backgroundColor: "white" }}
        >
            <Row
                className="m-0 h-100"
            >
                <Col
                    sm={4}
                    md={3}
                    className="border-end p-3 h-100 overflow-auto"
                >
                    <h4>
                        Users
                    </h4>
                    {error && <p className="text-danger">{error}</p>}
                    <div>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleUserChange(user)}
                                className={`p-2 mb-2 border rounded ${selectedUser?.username === user.username ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                style={{ cursor: "pointer" }}
                            >
                                {user.username}
                            </div>
                        ))}
                    </div>
                </Col>
                <Col
                    sm={8}
                    md={9}
                    className="p-3 d-flex flex-column h-100"
                >
                    <div
                        className="flex-grow-1 overflow-auto mb-3"
                    >
                        {hasMore && (
                            <div
                                className="text-center my-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={handleLoadMore}
                                >
                                    Load more
                                </Button>
                            </div>
                        )}
                        {messages.map((msg) => {
                            const isMine = msg.sender !== selectedUser.username
                            return (
                                <div
                                    key={msg.id}
                                    className={`d-flex mb-2 ${isMine ? "justify-content-end" : "justify-content-start"}`}
                                >
                                    <div
                                        className={`p-2 border rounded ${isMine ? "bg-primary text-white" : "bg-white text-dark"}`}
                                        style={{ maxWidth: "75%" }}
                                    >
                                        <span>
                                            {msg.content}
                                        </span>
                                        <div
                                            style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "2px" }}
                                        >
                                            {msg.sender} at {msg.timestamp}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* <div
                        className="d-flex mt-auto"
                    >
                        <Form.Control
                            type="text"
                            value={newMessage}
                            onChange={handleMessageChange}
                            placeholder="Type a message..."
                            className="me-2"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!selectedUser || !newMessage.trim()}
                        >
                            Send
                        </Button>
                    </div> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Chat