import { useContext, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"
import { AgendaPage } from "./AgendaPage"

export const UpdateAgendaPage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [query, setQuery] = useState({})
    const [uQuery, setUQuery] = useState()

    const handleChange = (event) =>{
        const {name, value} = event.target
        if(name ==='uquery') {
            setUQuery(value)
            return
        }
        setQuery(prevData=>({
            ...prevData,
            [name]: value
        }))        
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(uQuery){
            fetchData(`http://localhost:3000${endpoint}${uQuery}`,'GET')
            return
        }
        const queryUrl = new URLSearchParams();
        Object.keys(query).forEach((key) => {
            if (query[key]) queryUrl.append(key, query[key]);
        })
        fetchData(`http://localhost:3000${endpoint}items?${queryUrl.toString()}`,'GET')
    }
    return(
        <>
            {
                routerData && (
                    <div className="form-ById">
                        <form onSubmit={handleSubmit}>
                            {!routerData.items? <input type="text" name={'uquery'} onChange={handleChange} placeholder="Ingrese ID" /> : 
                                    routerData.items.map((item, index) => (
                                        item.type === 'date' ? <input key={index} name={item.name} type="date" placeholder={item.name} onChange={handleChange}/> : 
                                            <input key={index} name={item.name} type="text" placeholder={item.name} onChange={handleChange}/>
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
                data ? <InformesPage data2={[data]} endpoint={endpoint} /> : <>{error}</>}
        </>
    )
}
