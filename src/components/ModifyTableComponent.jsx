import { useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"

export const ModifyTableComponent = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [dataModify, setDataModify] = useState({})
    const [type, setTypes] = useState({})

    useEffect(()=>{
        setDataModify(data2[0])
        Object.keys(dataModify).forEach((item)=>{
            if(typeof dataModify[item] == 'number') {
                setTypes(prevData => ({
                    ...prevData,
                    [item]:'number'
                }))
            }
            else if(isValidDate(dataModify[item])) {
                setTypes(prevData => ({
                    ...prevData,
                    [item]:'date'
                }))
            }
            else if(dataModify[item] == 'string') {
                setTypes(prevData => ({
                    ...prevData,
                    [item]:'text'
                }))
            }
            
        })
    },[])

    const handleChange = (e)=>{
        const{name, value}= e.target
        console.log(value)
        setDataModify(prevData=>({
            ...prevData,
            [name]: value
        }))
        console.log('valor actualizado')
    }

    const handleClick = () =>{
            fetchData(`http://localhost:3000${endpoint}`,'PUT',dataModify)
    }

    const isValidDate = (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()); 
      }

    const formatDate = (date) => {
        if (date instanceof Date || typeof date === "string") {
            // Si la fecha está en formato ISO (con T), solo devolvemos YYYY-MM-DD
            const dateObject = new Date(date);
            return dateObject.toISOString().split("T")[0]; // Convierte a 'YYYY-MM-DD'
        }
        return date;
    }
    console.log({dataModify})
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
                                <tr>{Object.keys(dataModify).map((prop)=>{
                                        return <td><input type={type[prop]} name={prop} onChange={handleChange} value={dataModify[prop]}/></td>
                                       /* const value = dataModify[prop] || ""
                                        if(typeof dataModify[prop] === "number"){
                                            return <td><input type='number' name={prop} onChange={handleChange} value={dataModify[prop]}/></td>
                                        }
                                        if(isValidDate(dataModify[prop])){
                                            return <td><input type='date' name={prop} onChange={handleChange} value={formatDate(value)}/></td>
                                        }
                                        return <td><input type='text' name={prop} onChange={handleChange} value={dataModify[prop] || ""}/></td>*/
                                    })}
                                </tr>
                            </tbody>
            </table>
            <button onClick={handleClick}>Modificar</button>
            {!isLoading && 
                data ? <p>{data.message}</p> : <>{error}</>}
        </>
    )
}