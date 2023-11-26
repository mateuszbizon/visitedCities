import { Outlet, Navigate } from 'react-router-dom'


function AuthRoutes() {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    user ? <Outlet /> : <Navigate to="/" />
  )
}

export default AuthRoutes;