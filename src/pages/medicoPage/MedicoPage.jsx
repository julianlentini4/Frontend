import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"

export const MedicoPage = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [matricula, setMatricula] = useState()
    const [apellido, setApellido] = useState()
    const [nombre, setNombre] = useState()
    const [dni, setDni] = useState()
    const [validate, setValidate] = useState(true)

    useEffect(()=>{
        Object.keys(data2[0]).forEach((item)=>{
            if(item === 'matricula') setMatricula(data2[0][item])
            if(item === 'apellido') setApellido(data2[0][item])
            if(item === 'nombre') setNombre(data2[0][item])
            if(item === 'dni') setDni(data2[0][item])
            
        })
    },[])

    const handleChange = (e)=>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'apellido') setApellido(value)
        if(name === 'nombre') setNombre(value)
        if(name === 'dni') setDni(parseInt(value))
    }

    const handleClick = () =>{
        console.log(dni)
        if(matricula=='' || apellido == '' || nombre == '' || isNaN(dni)){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'PUT',{matricula,apellido,nombre,dni})
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
                                        if(prop == 'matricula' ){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={matricula} readOnly/></td>
                                        }
                                        if(prop == 'apellido' ){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={apellido}/></td>
                                        }
                                        if(prop == 'nombre'){
                                            return <td><input type='text' name={prop} onChange={handleChange} value={nombre}/></td>
                                        }
                                        if(prop == 'dni' ){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={dni}/></td>
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