import MainPage from "./pages/MainPage";
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/LoginPage";

export default function App(logedin) {

  return (
    <Routes>
      <Route index element={<Navigate replace to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="logedin" element={<MainPage logedin={logedin} />} />

    </Routes>


  )
}
