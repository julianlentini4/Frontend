import { useContext, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"

export const CreateInformePage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [nroAcceso, setNroAcceso] = useState()
    const [matricula, setMatricula] = useState()
    const [descripcion, setDescripcion] = useState()
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFirmado, setFechaFirmado] = useState()
    const [estado, setEstado] = useState()
    const [validate, setValidate] = useState(true)

    const handleChange = (e) =>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'nroAcceso') setNroAcceso(parseInt(value))
        if(name === 'matricula') setMatricula(parseInt(value))
        if(name === 'descripcion') setDescripcion(value)
        if(name === 'fechaInicio') setFechaInicio(value)
        if(name === 'fechaFirmado') setFechaFirmado(value)
        if(name === 'estado') setEstado(value)   
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isNaN(nroAcceso) || isNaN(matricula) || descripcion == '' || fechaInicio == '' || fechaFirmado == '' || estado == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'POST',{nroAcceso,matricula,descripcion,fechaInicio,fechaFirmado,estado})
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
