import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import '../../style/loginApp.css'

export const LoginApp = () =>{

    const{setIsLogged} = useContext(UserContext) 
    const{data,fetchData} = useFetch() 
    const [user,setUserName] = useState({
        username:'',
        clave:''
    })
    const [isErrorName,setError] = useState('')
    const navigate = useNavigate()

    /*Escuha el cambio en la variable DATA*/
    useEffect(()=>{
        if(data.length > 0){
            setIsLogged(true)
            navigate('/home')
        }
    },[data])

    /*---Handle Change and Submit Functions---*/
    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(user.username.trim().length < 4 || user.clave.trim().length < 4){
            //Setea el estado del error
            setError('Ingrese nombre mayor a 4 caracteres')
            return
        }
        //Custom Hook Fetch - API Usuarios
        await fetchData('http://localhost:3000/users/access','POST',user) 
    }

    const handleChangeName = (event) =>{
        const {name, value} = event.target
        setUserName(prevData=>({
            ...prevData,
            [name]: value
        }))        
    }

    return(            
    <div className="form_container">
        <form className="form" onSubmit={handleSubmit}>
            <h1>Hospital</h1>
            <input type="text" name={'username'} value={user.username} onChange={handleChangeName} placeholder="Ingrese su usuario"/>
            <input type="text" name={'clave'} value={user.clave} onChange={handleChangeName} placeholder="Ingrese su clave"/>
            <p className="error">{isErrorName ? isErrorName : 'null'}</p> 
            <label>
                <button type="submit">Enviar</button>
            </label>      
        </form>
    </div>
    )
}