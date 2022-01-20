import MainMessages from "./Messages";
import SideChat from "./SideChat";
import '../styles/index.css'
import '../styles/reset.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginHeader from "./components/LoginHeader";

export default function MainPage({ logedin, logOut, users }) {

    const [conversation, setConversation] = useState([])
    const [currentConversation, setCurrentConversation] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (logedin === null) navigate('/')
    }, [logedin, navigate])

    useEffect(() => {
        if (params.conversationId) {
            fetch(`http://localhost:4000/conversations/${params.conversationId}?_embed=messages`)
                .then(resp => resp.json())
                .then(conversation => setCurrentConversation(conversation))
        }
    }, [params.conversationId])

    useEffect(() => {
        if (logedin === null) return
        fetch(`http://localhost:4000/conversations?userId=${logedin.id}`)
            .then(resp => resp.json())
            .then(conversation => setConversation(conversation))

    }, [logedin])

    if (logedin === null) return <h1>Not signed in...</h1>

    return (
        <div className="main-wrapper">
            <aside>

                <header className="panel">
                    <img
                        className="avatar"
                        width="50"
                        height="50"
                        src={logedin.avatar}
                        alt=""
                    />
                    <h3>{`${logedin.firstName} ${logedin.lastName}`}</h3>
                    <button onClick={() => logOut()}>LOG OUT</button>
                </header>

                <form className="aside__search-container">
                    <input
                        type="search"
                        name="messagesSearch"
                        placeholder="Search chats"
                        value=''
                    />
                </form>
                {/* <SideChat  /> */}

                <ul>
                    <li>
                        <button className="chat-button">
                            <div><h3>+ Start a new Chat</h3></div>
                        </button>
                    </li>

                    {conversation.map(conversations => {
                        const talkingToId =
                            logedin.id = conversations.userId
                                ? conversations.participantId
                                : conversations.userId

                        const talkingToUser = users.find(user => user.id === talkingToId)
                        return (
                            <li>
                                <button className="chat-button"
                                    onClick={() => navigate(`/loggedin/${conversations.id}`)}
                                >

                                    <img
                                        className="avatar"
                                        height="50"
                                        width="50"
                                        alt=""
                                        src={talkingToUser.avatar}
                                    />

                                    <div>
                                        <h3>  {talkingToUser.firstName} {talkingToUser.lastName}</h3>
                                        <p>Last message</p>
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </ul>

            </aside>
            {params.conversationId ? (
                <MainMessages />
            ) : null}

            {/* /* <!-- Main Chat Section --> */}

        </div>

    )
}