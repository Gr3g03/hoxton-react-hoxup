
function UserLogin({ login, user }) {
    return (
        <button className="user-selection"
            onClick={() => {
                login(user)

            }}>
            <img
                className="avatar"
                width="50"
                height="50"
                src={user.avatar}
                alt={user.firstName}
            />
            <h3>{user.firstName}  {user.lastName}</h3>
        </button>
    )
}

export default UserLogin