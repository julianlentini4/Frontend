import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import '../../style/loginApp.css'

export const LoginApp = ({endpoint}) =>{

    const{setUser,setIsLogged} = useContext(UserContext) //useContext
    const{data,error,fetchData} = useFetch() //Hook personalizado de fetch de datos
    const [userName,setUserName] = useState('') //useState
    const [isErrorName,setError] = useState('') //useState
    const navigate = useNavigate() //Permite navegar a otras direcciones

    /*Escuha el cambio en la variable DATA*/
    useEffect(()=>{
        if(data.access){
            console.log("sisi")
            setIsLogged(true)
            setUser(data.data)
            navigate('/home')
        }
    },[data])

    /*---Handle Change and Submit Functions---*/
    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(userName.trim().length < 4){
            //Setea el estado del error
            setError('Ingrese nombre mayor a 4 caracteres')
            return
        }//localhost:3000/users/items?username=JUANMA
        //CustomHook Fetch - API Usuarios
        await fetchData(`http://localhost:3000/users/items?username=${userName}`,'GET') 
    }

    const handleChangeName = (event) => {
        //Setea el estado del error en un string vacio
        setError('')
        //Setea el valor del nombre de usuario
        setUserName(event.target.value)
    }


    return(            
    <div className="form_container">
        <form onSubmit={handleSubmit}>
            <h1>Tareas</h1>
            <input type="text" value={userName} onChange={handleChangeName} placeholder="Ingrese su usuario"/>
            <p className="error">{isErrorName ? isErrorName : !data.access && data.message }</p> 
            <label>
                <button type="submit">Enviar</button>
            </label>      
        </form>
        {}
    </div>
    )
}