import { useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { AutoTablaComponent } from "./AutoTablaComponent"


export const GetAllComponent = ({endpoint}) =>{
    const {data,fetchData,isLoading,error} = useFetch()
    useEffect(()=>{
        const fetchUserData = async () => {
            await fetchData(`http://localhost:3000${endpoint}`,'GET')
          }
        fetchUserData()
    },[])
    return (
        <>
            {isLoading ? <p className="loading">Cargando...</p> :
                data ? <AutoTablaComponent data={data}/> : <p>{error}</p>
            }
        </>
    )
}