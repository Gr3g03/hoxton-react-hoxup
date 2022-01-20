export default function LoginHeader({ logedin }) {
    return (
        <header className="panel">
            <img
                className="avatar"
                width="50"
                height="50"
                src={logedin.avatar}
                alt=""
            />
            <h3>{`${logedin.firstName} ${logedin.lastName}`}</h3>
        </header>
    )
}
