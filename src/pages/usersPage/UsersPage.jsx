import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const UsersPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [username, setUsername] = useState()
    const [clave, setClave] = useState()
    const [tipo, setTipo] = useState()
    const [sector, setSector] = useState()
    const [descripcion, setDescripcion] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'username') setUsername(data2[0][item])
            if(item === 'clave') setClave(data2[0][item])
            if(item === 'tipo') setTipo(data2[0][item])
            if(item === 'sector') setSector(data2[0][item])
            if(item === 'descripcion') setDescripcion(data2[0][item])
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'username') setUsername(value)
        if(name === 'clave') setClave(value)
        if(name === 'tipo') setTipo(value)
        if(name === 'sector') setSector(value)
        if(name === 'descripcion') setDescripcion(value)
    }

    const handleClick = () =>{
        if(username=='' || clave == '' || tipo == '' || sector == '' || descripcion=='' ){
            setValidate(false)
            return
        }
            fetchData(`http://localhost:3000${endpoint}`,'PUT',{username,clave,tipo,sector,descripcion})
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
                                        if(prop == 'clave' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={clave}/></td>
                                        }
                                        if(prop == 'username'){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={username} readOnly/></td>
                                        }
                                        if(prop == 'sector' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={sector}/></td>
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