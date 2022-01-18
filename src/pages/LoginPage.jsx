import { useEffect, useState } from "react"


export default function Login() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/users`)
            .then(resp => resp.json())
            .then(getUsersFromServer => setUsers(getUsersFromServer))
    }, [])

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
                                <button className="user-selection"
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
                        <button className="user-selection"><h3>+ Add a new user</h3></button>
                    </li>

                </ul>
            </section>
        </div>

    )
}