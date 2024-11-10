import { useContext } from 'react'
import '../style/NavBarComponent.css'
import { UserContext } from '../context/UseContext'
import { useNavigate } from 'react-router-dom'
export const NavBarComponent = () => {
    const {user,setIsLogged} = useContext(UserContext)
    const navigate = useNavigate()
    const handleClickLogout = () =>{
        setIsLogged(false)
        navigate('/login', {replace: true});
    }
    const handleClickHome = () =>{
        navigate("/home" , {replace: true});
    }
    return(
        <nav className="navBar_container">
            <h3 onClick={handleClickHome}>{user.username}</h3>
            <button  onClick={handleClickLogout} className="material-symbols-outlined">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
            </button>
        </nav>
    )}