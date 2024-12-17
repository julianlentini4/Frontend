import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const TipoIngresosPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [idIngreso, setIdIngreso] = useState()
    const [tipo, setTipo] = useState()
    const [descripcion, setDescripcion] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'idIngreso') setIdIngreso(data2[0][item])
            if(item === 'tipo') setTipo(data2[0][item])
            if(item === 'descripcion') setDescripcion(data2[0][item])
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'tipo') setTipo(value)
        if(name === 'descripcion') setDescripcion(value)
    }

    const handleClick = () =>{
        if(isNaN(idIngreso) || tipo == '' || descripcion==''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'PUT',{idIngreso,tipo,descripcion})
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
                                        if(prop == "descripcion" ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={descripcion}/></td>
                                        }
                                        if(prop == 'tipo' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={tipo}/></td>
                                        }
                                        if(prop == 'idIngreso'){
                                            return <td><input type='number' name={prop} value={idIngreso} readOnly/></td>
                                        }
                                    })}
                                </tr>
                            </tbody>
            </table>
            <button onClick={handleClick}>Modificar</button>
            {!isLoading && 
                data ? <p>{data.message}</p> : <>{error}</>}
            {!validate && <p className="error">Los campos son requeridos</p>}
        </>
    )
}