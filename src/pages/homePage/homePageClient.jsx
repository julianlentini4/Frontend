import { useContext, useEffect } from "react"
import '../../style/HomePageClient.css'
import { UserContext } from "../../context/UseContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { ListaIngresos } from "./listaIngresos"

export const HomePageClient = ()=>{
    const navigate = useNavigate()
    const {user, isLogged} = useContext(UserContext)
    const { data, isLoading, error, fetchData } = useFetch()

    useEffect(() => {
        if(isLogged){
            fetchData(`http://localhost:3000/ingreso`, 'GET')
        }
    }, [])

    useEffect(() => {
    if (!isLogged) {
            navigate('/login'); // Redirigir si no hay usuario
        }
    }, [isLogged]);

    return(
        <>            
            <h2>Tipos de ingresos: </h2>
            {isLoading
                ? <h4>Cargando...</h4>
                : error
                    ? <h4>Ha ocurrido un error: {error}</h4>
                    :
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Id Ingreso</th>
                                    <th scope="col">Tipo de Ingreso</th>
                                    <th scope="col">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((ingreso,index) => {
                                        return(
                                                <ListaIngresos data={ingreso} index={index} key={index}/>
                                            )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
        </>
    )
}