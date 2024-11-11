import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const PacientesPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [dni, setDni] = useState()
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [mail, setMail] = useState()
    const [obraSocial, setObraSocial] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'dni') setDni(data2[0][item])
            if(item === 'nombre') setNombre(data2[0][item])
            if(item === 'apellido') setApellido(data2[0][item])
            if(item === 'mail') setMail(data2[0][item])
            if(item === 'obraSocial') setObraSocial(data2[0][item])
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'nombre') setNombre(value)
        if(name === 'apellido') setApellido(value)
        if(name === 'mail') setMail(value)
        if(name === 'obraSocial') setObraSocial(value)
    }

    const handleClick = () =>{
        if(isNaN(dni) || nombre == '' || apellido == '' || mail == '' || obraSocial == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'PUT',{dni,nombre,apellido,mail,obraSocial})
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
                                        if(prop == "nombre"){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={nombre}/></td>
                                        }
                                        if(prop == "apellido" ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={apellido}/></td>
                                        }
                                        if(prop === "mail"){
                                            return <td><input type='email' name={prop} onChange={handleChange} value={mail}/></td>
                                        }
                                        if(prop == "obraSocial" ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={obraSocial}/></td>
                                        }
                                        if(prop == "dni" ){
                                            return <td><input type='number' name={prop} value={dni} readOnly/></td>
                                        }
                                    })}
                                </tr>
                            </tbody>
            </table>
            <button type="submit" onClick={handleClick} >Modificar</button>
            {!isLoading && 
                data ? <p>{data.message}</p> : <>{error}</>}
            {!validate && <p className="error">Los campos son requeridos</p>}
        </>
    )
}