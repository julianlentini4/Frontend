import { useContext, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"

export const CreateSalaPage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [nroSala, setNroSala] = useState()
    const [estado, setEstado] = useState()
    const [validate, setValidate] = useState(true)

    const handleChange = (e) =>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'nroSala') setNroSala(parseInt(value))
        if(name === 'estado') setEstado(value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isNaN(nroSala) || estado == '' ){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'POST',{nroSala,estado})
    }
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
            {!validate && <p className="error">Los campos son requeridos</p>}
        </>
    )
}
