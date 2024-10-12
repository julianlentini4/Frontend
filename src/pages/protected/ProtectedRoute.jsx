import { useContext } from "react"
import { UserContext } from "../../context/UseContext"
import { Navigate,Outlet } from "react-router-dom"

function ProtectedRoute (){
    const{user} = useContext(UserContext)
    if(!user) return <Navigate to="/login" replace/>;

    return <Outlet/>;
}
export default ProtectedRoute