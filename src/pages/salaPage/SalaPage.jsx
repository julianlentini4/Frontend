import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const SalaPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [nroSala, setNroSala] = useState()
    const [estado, setEstado] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'nroSala') setNroSala(data2[0][item])
            if(item === 'estado') setEstado(data2[0][item])          
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'nroSala') setNroSala(parseInt(value))
        if(name === 'estado') setEstado(value)
    }

    const handleClick = () =>{
        if(nroSala=='' || estado == '' ){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'PUT',{nroSala,estado})
    }

    return(
        <>
            <table className="table">
                            <thead>
                                <tr>
                                    {Object.keys(data2[0]).map((prop)=>{
                                        return <th>{[prop]}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>{Object.keys(data2[0]).map((prop)=>{
   
                                        if(prop == 'nroSala'){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={nroSala} readOnly required/></td>
                                        }
                                        if(prop == 'estado' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={estado} required/></td>
                                        }
                                    })}
                                </tr>
                            </tbody>
            </table>
            <h2>Estados de sala: Disponible - Ocupada</h2>
            <button type="submit" onClick={handleClick}>Modificar</button>
            {!isLoading && 
                data ? <p>{data.message}</p> : <>{error}</>}
            {!validate && <p className="error">Los campos son requeridos</p>}
        </>
    )
}