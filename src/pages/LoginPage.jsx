import { useEffect, useState } from "react"
import { useNavigate, } from "react-router-dom"
import UserLogin from "./components/UserLogin"


export default function Login({ login, users, setModal, modal }) {


    const navigate = useNavigate()



    if (users === null) return <p>Loading...</p>
    return (
        <div className="main-wrapper login">
            <section className="login-section">
                <h2>Choose your user!</h2>
                <ul>
                    {
                        users.map(user =>
                            <li key={user.id}  >
                                <UserLogin login={login} user={user} />

                            </li>

                        )}

                    <li>
                        <button
                            className='user-selection'
                            onClick={() => setModal('new-user')}
                        >
                            <h3>+ Add a new user</h3>
                        </button>
                    </li>

                </ul>
            </section>
        </div>

    )
}