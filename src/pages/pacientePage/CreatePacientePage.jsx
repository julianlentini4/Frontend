import { useContext, useEffect, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"

export const CreatePacientePage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [dni, setDni] = useState()
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [mail, setMail] = useState()
    const [obraSocial, setObraSocial] = useState()
    const [validate, setValidate] = useState(true)

    const handleChange = (e) =>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'dni') setDni(parseInt(value))
        if(name === 'nombre') setNombre(value)
        if(name === 'apellido') setApellido(value)
        if(name === 'mail') setMail(value)
        if(name === 'obraSocial') setObraSocial(value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isNaN(dni) || nombre == '' || apellido == '' || mail == '' || obraSocial == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'POST',{dni,apellido,nombre,mail,obraSocial})
    }
    return(
        <>
            {
                routerData && (
                    <div className="form-ById">
                        <form onSubmit={handleSubmit}>
                            {routerData.items &&  
                                    routerData.items.map((item, index) => (
                                        item.type === 'email' ? <input key={index} name={item.name} type="email" placeholder={item.name} onChange={handleChange}/> : 
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
