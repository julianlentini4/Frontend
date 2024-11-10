import { useContext, useEffect,useState } from "react"
import { UserContext } from "../../context/UseContext"
import { Navigate,Outlet,useLocation } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"

function ProtectedRoute (){
  const {data = null,isLoading,fetchData} = useFetch()
  const{setUser} = useContext(UserContext)
  const location = useLocation();
  useEffect(()=>{  
    const fetchUserData = async () => {
        await fetchData('http://localhost:3000/verify','GET')
      }
    fetchUserData()
  },[location.pathname]);
  useEffect(() => {
    if (data.data) {
      setUser(data.data);
    }
  },[data.data])
  
  return(
    <>
      {isLoading ? <p className="loading">Cargando...</p> : 
        !data.data ? <Navigate to="/login" replace/> :
          <Outlet/>}
    </>
  )
}
export default ProtectedRoute