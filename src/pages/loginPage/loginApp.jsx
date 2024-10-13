import { useContext, useState,useEffect } from "react"
import { UserContext } from "../../context/UseContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import '../../style/loginApp.css'

export const LoginApp = ({endpoint}) =>{

    const{setUser,setIsLogged} = useContext(UserContext)
    const{data,error,fetchData} = useFetch()
    const [userName,setUserName] = useState('')
    const [isErrorName,setError] = useState('')
    const navigate = useNavigate()

    /*Escuha el cambio en la variable DATA*/
    useEffect(()=>{
        if(data){
            setIsLogged(true)
            setUser(data)
            navigate('/home')
        }
    },[data])

    /*---Handle Change and Submit Functions---*/
    const handleChangeName = (event) => {
        setError('')
        setUserName(event.target.value)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(userName.trim().length < 4){
            setError('Ingrese nombre mayor a 4 caracteres')
            return
        }
        await fetchData(`https://jsonplaceholder.typicode.com/${endpoint}?username=${userName}`,'GET') //hook Fetch - API Usuarios
    }

    return(            
    <div className="form_container">
        <form onSubmit={handleSubmit}>
            <h1>Tareas</h1>
            <input type="text" value={userName} onChange={handleChangeName} placeholder="Ingrese su usuario"/>
            <p className="error">{isErrorName ? isErrorName : error}</p> 
            <label>
                <button type="submit">Enviar</button>
            </label>      
        </form>
    </div>
    )
}