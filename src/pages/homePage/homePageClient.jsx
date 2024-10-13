import { useContext, useEffect } from "react"
import '../../style/HomePageClient.css'
import { UserContext } from "../../context/UseContext"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { TaskClient } from "./taskClient"

export const HomePageClient = ()=>{
    const navigate = useNavigate()
    const {user, isLogged} = useContext(UserContext)
    const { data, isLoading, error, fetchData } = useFetch()

    useEffect(() => {
        if(isLogged){
            fetchData(`https://jsonplaceholder.typicode.com/todos?userId=${user[0].id}`, 'GET')
        }
    }, [])

    useEffect(() => {
    if (!isLogged) {
            navigate('/login'); // Redirigir si no hay usuario
        }
    }, [isLogged]);

    return(<>            
        <h2>Lista de Tareas: </h2>
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
                                <th scope="col">Id Tarea</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((task,index) => {
                                    return(
                                            <TaskClient task={task} index={index}/>
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