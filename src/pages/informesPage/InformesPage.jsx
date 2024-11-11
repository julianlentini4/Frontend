import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const InformesPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [idInforme, setidInforme] = useState()
    const [nroAcceso, setNroAcceso] = useState()
    const [matricula, setMatricula] = useState()
    const [descripcion, setDescripcion] = useState()
    const [fechaInicio, setFechaInicio] = useState()
    const [fechaFirmado, setFechaFirmado] = useState()
    const [estado, setEstado] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'idInforme') setidInforme(data2[0][item])
            if(item === 'nroAcceso') setNroAcceso(data2[0][item])
            if(item === 'matricula') setMatricula(data2[0][item])
            if(item === 'descripcion') setDescripcion(data2[0][item])
            if(item === 'fechaInicio') {
                const dateObject = new Date(data2[0][item]);
                setFechaInicio(dateObject.toISOString().split("T")[0])
            }
            if(item === 'fechaFirmado') {
                const dateObject = new Date(data2[0][item]);
                setFechaFirmado(dateObject.toISOString().split("T")[0])
            }
            if(item === 'estado') setEstado(data2[0][item])
            
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'idInforme') setidInforme(parseInt(value))
        if(name === 'nroAcceso') setNroAcceso(parseInt(value))
        if(name === 'matricula') setMatricula(parseInt(value))
        if(name === 'descripcion') setDescripcion(value)
        if(name === 'fechaInicio') setFechaInicio(value)
        if(name === 'fechaFirmado') setFechaFirmado(value)
        if(name === 'estado') setEstado(value)
    }

    const handleClick = () =>{
        if(isNaN(idInforme) || isNaN(nroAcceso) || isNaN(matricula) || descripcion == '' || fechaInicio == '' || fechaFirmado == '' || estado == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'PUT',{idInforme,nroAcceso,matricula,descripcion,fechaInicio,fechaFirmado,estado})
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
                                        if(prop == "fechaFirmado"){
                                            return <td><input type='date' name={prop} onChange={handleChange} value={fechaFirmado}/></td>
                                        }
                                        if(prop == "fechaInicio" ){
                                            return <td><input type='date' name={prop} onChange={handleChange} value={fechaInicio}/></td>
                                        }
                                        if(prop == 'matricula' ){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={matricula}/></td>
                                        }
                                        if(prop == 'nroAcceso' ){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={nroAcceso}/></td>
                                        }
                                        if(prop == 'idInforme'){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={idInforme} readOnly/></td>
                                        }
                                        if(prop == 'descripcion' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={descripcion}/></td>
                                        }
                                        if(prop == 'estado' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={estado}/></td>
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