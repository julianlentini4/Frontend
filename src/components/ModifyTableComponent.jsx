import { useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"

export const ModifyTableComponent = ({data2,endpoint}) =>{
    const {data, fetchData, isLoading, error} = useFetch()
    const [dataModify, setDataModify] = useState({})

    const handleChange = (e)=>{
        const{name, value}= e.target
        setDataModify(prevData=>({
            ...prevData,
            [name]: value
        }))
    }

    const handleClick = () =>{
        fetchData(`http://localhost:3000${endpoint}`,'PUT',dataModify)
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
                                        return <td><input type='text' name={prop} onChange={handleChange} value={data2[0][prop] || ""}/></td>
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