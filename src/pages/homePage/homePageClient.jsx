import { useContext, useEffect, useState} from "react"
import '../../style/HomePageClient.css'
import { UserContext } from "../../context/UseContext"
import { Navigate, useNavigate} from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"

export const HomePageClient = ()=>{
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const { data, isLoading, error, fetchData } = useFetch()

    useEffect(() => {
        fetchData(`https://jsonplaceholder.typicode.com/todos?userId=${user[0].id}`, 'GET')
    }, [])

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
                                data.map((comment,index) => {
                                    return (
                                            <tr key={comment.id}>
                                                <th scope="row">{index+1}</th>
                                                <th scope="row">{comment.id}</th>
                                                <td>{comment.title}</td>
                                                <td>{comment.completed ? 'Completado' : 'Pendiente'}</td>
                                            </tr>
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