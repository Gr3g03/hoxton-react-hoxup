import { useEffect, useState } from "react"
import { useNavigate, } from "react-router-dom"


export default function Login(props) {


    const navigate = useNavigate()





    if (props.users === null) return <p>Loading...</p>
    return (
        <div className="main-wrapper login">
            <section className="login-section">
                <h2>Choose your user!</h2>
                <ul>
                    {
                        props.users.map(user =>
                            <li key={user.id}  >
                                <button className="user-selection"
                                    onClick={(e) => {
                                        props.setLogedin(user)
                                        navigate('/logedin')

                                    }}
                                >
                                    <img
                                        className="avatar"
                                        width="50"
                                        height="50"
                                        src={user.avatar}
                                        alt={user.firstName}
                                    />
                                    <h3>{user.firstName}  {user.lastName}</h3>
                                </button>

                            </li>

                        )}

                    <li>
                        <button
                            className='user-selection'
                            onClick={() => props.setModal('new-user')}
                        >
                            <h3>+ Add a new user</h3>
                        </button>
                    </li>

                </ul>
            </section>
        </div>

    )
}