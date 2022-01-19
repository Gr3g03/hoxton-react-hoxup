import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate, } from "react-router-dom"


export default function Login() {

    const [users, setUsers] = useState([])
    const [logedin, setLogedin] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:4000/users`)
            .then(resp => resp.json())
            .then(getUsersFromServer => setUsers(getUsersFromServer))
    }, [])


    function login(id, users) {
        return fetch(`http://localhost:4000/users/${id}`)
            .then(resp => resp.json())
            .then((user) => {
                if (user.id === users) {

                    // let logedinUser = JSON.parse(JSON.stringify(users))
                    // const match = logedinUser.find((target) => target.id === users.id)
                    // setLogedin(logedinUser)




                }
            })
    }

    console.log(logedin)

    function addANewUser(firstName, lastName, phoneNumber, avatar) {
        return fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                avatar: avatar
            })
        }).then(resp => resp.json)
            .then((newUser) => {
                const updatedUser = JSON.parse(JSON.stringify(users))
                const match = updatedUser.find((target) => target === users)
                match.comments.push(newUser)
                setUsers(updatedUser)
            })
    }
    return (
        <div className="main-wrapper login">
            <section className="login-section">
                <h2>Choose your user!</h2>
                <ul>
                    {
                        users.map(user =>
                            <li key={user.id}>
                                {/* <Link to={"/logedin"}> */}
                                <button className="user-selection"
                                    onClick={function () {

                                        let logedinUser = [...logedin, users]
                                        navigate('/logedin')
                                        setLogedin(logedinUser)
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
                                {/* </Link> */}
                            </li>

                        )}

                    <li>
                        <button className="user-selection" onChange={() => addANewUser}><h3>+ Add a new user</h3></button>
                    </li>

                </ul>
            </section>
        </div>

    )
}