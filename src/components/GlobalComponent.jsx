import { useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { RouterContext } from "../context/UseContext"

export const GlobalComponent = ({datos}) =>{
    const {setRouterData} = useContext(RouterContext)
    const navigate = useNavigate()
    const handleClick = (option,url) =>{  
        setRouterData(option)
        navigate(url)
    }
    return(<>
        <h1>{datos.name}</h1>
        {datos.options.map((option)=>{
            return(<button onClick={()=> handleClick(option,datos.route + option.subroute)}>{option.nombre}</button>)
        })}
        <Outlet/>
    </>)
}