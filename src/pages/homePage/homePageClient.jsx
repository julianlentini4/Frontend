import { useContext, useEffect } from "react"
import '../../style/HomePageClient.css'
import { UserContext } from "../../context/UseContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { ListaIngresos } from "./listaIngresos"

export const HomePageClient = ()=>{
    
    return(
        <>            
        <h1>¡Bienvenido a la pagina del Hospital!</h1>
        <p>Información</p>
        <p>Novedades</p>
        </>
    )
}