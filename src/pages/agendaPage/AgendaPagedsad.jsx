import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AgendaPage = ({ data2, endpoint }) => {
  const { data, fetchData, isLoading, error } = useFetch()
  const [idAgenda, setIdAgenda] = useState()
  const [matricula, setMatricula] = useState()
  const [validate, setValidate] = useState(true)

  useEffect(()=>{
    Object.keys(data2[0]).forEach((item)=>{
        if(item === 'idAgenda') setIdAgenda(data2[0][item])   
        if(item === 'matricula') setMatricula(data2[0][item])
    })
},[])

  const handleChange = (e)=>{
    setValidate(true)
    const{name, value}= e.target
    if(name === 'matricula') setMatricula(parseInt(value))
  }
  const handleClick = () =>{
    if(matricula=='' || isNaN(idAgenda)){
        setValidate(false)
        return
    }
    fetchData(`http://localhost:3000${endpoint}`,'PUT',{matricula})
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
                                  if(prop == 'idAgenda' ){
                                      return <td><input type='number' name={prop} onChange={handleChange} value={idAgenda} readOnly/></td>
                                  }                              
                                  if(prop == 'matricula' ){
                                      return <td><input type='number' name={prop} onChange={handleChange} value={matricula}/></td>
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