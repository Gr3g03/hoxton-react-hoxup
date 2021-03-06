import MainPage from "./pages/MainPage";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from "./pages/LoginPage";
import { useEffect, useState } from "react/cjs/react.development";
import ModalWraper from "./pages/Modal";
import NotFound from "./pages/NotFound";


export default function App() {

  const [logedin, setLogedin] = useState(null)
  const [modal, setModal] = useState('')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  function login(user) {
    setLogedin(user)

    navigate('/logedin')
  }

  function logOut() {
    setLogedin(null)

  }

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
        updatedUser.push({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          avatar: avatar
        })
        setUsers(updatedUser)
      })
  }
  return (
    <div className='app'>
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login users={users} setModal={setModal} modal={modal} login={login} />} />
        <Route path="/logedin" element={<MainPage logedin={logedin} logOut={logOut} users={users} />} />
        <Route path="/logedin/:conversationId" element={<MainPage logedin={logedin} logOut={logOut} users={users} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {modal === 'new-user' ? (
        <div className="modal-wrapper" onClick={() => setModal("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal("")} className="close-modal">
              X
            </button>
            <form className="new-user" onSubmit={(e) => {
              e.preventDefault()
              // @ts-ignore
              addANewUser(e.target.firstName.value, e.target.lastName.value, e.target.phoneNumber.value)
              // @ts-ignore
              e.target.reset()
            }}>
              <label htmlFor="firstName">First name</label>
              <input name="firstName" id="firstName" type="text" />
              <label htmlFor="lastName">Last name</label>
              <input name="lastName" id="lastName" type="text" />
              <label htmlFor="phoneNumber">Phone Number</label>
              <input name="phoneNumber" id="phoneNumber" type="text" />
              <button type="submit">CREATE USER</button>
            </form>
          </div>
        </div>
      ) : null}

    </div>
  )
}
