import { useContext, useEffect, useState } from "react"
import { RouterContext } from "../context/UseContext"
import { useFetch } from "../hooks/useFetch"
import { AutoTablaComponent } from "./AutoTablaComponent"

export const CreateComponent = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [query, setQuery] = useState({})

    const handleChange = (event) =>{
        const {name, value} = event.target
        setQuery(prevData=>({
            ...prevData,
            [name]: value
        }))        
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetchData(`http://localhost:3000${endpoint}`,'POST',query)
    }
    console.log(query)
    return(
        <>
            {
                routerData && (
                    <div className="form-ById">
                        <form onSubmit={handleSubmit}>
                            {routerData.items &&  
                                    routerData.items.map((item, index) => (
                                        item.type === 'date' ? <input key={index} name={item.name} type="date" placeholder={item.name} onChange={handleChange}/> : 
                                            item.type === 'text' ? <input key={index} name={item.name} type="text" placeholder={item.name} onChange={handleChange}/> :
                                                <input key={index} name={item.name} type="number" placeholder={item.name} onChange={handleChange}/>
                                            
                                        )
                                    )
                            }
                            <label>
                                <button type="submit">Enviar</button>
                            </label>   
                        </form>
                    </div>
                    )
            }   
            {!isLoading && 
                data ? data.message : <>{error}</>}
        </>
    )
}
