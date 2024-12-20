import { useContext, useEffect, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"

export const CreateAgendaPage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [matricula, setMatricula] = useState()
    const [matriculasDisponibles, setMatriculasDisponibles] = useState([]);
    const [dia, setDia] = useState()
    const [horaInicio, setHoraInicio] = useState()
    const [horaFin, setHoraFin] = useState()
    const [validate, setValidate] = useState(true)

    const handleChange = (e) =>{
        setValidate(true)
        const{name, value}= e.target
        if(name === 'matricula') setMatricula(parseInt(value))
        if(name === 'dia') setDia(parseInt(value))
        if(name === 'horaInicio') setHoraInicio(value)
        if(name === 'horaFin') setHoraFin(value)
    }

    const diasSemana = [
        { value: 0, label: "Domingo" },
        { value: 1, label: "Lunes" },
        { value: 2, label: "Martes" },
        { value: 3, label: "Miércoles" },
        { value: 4, label: "Jueves" },
        { value: 5, label: "Viernes" },
        { value: 6, label: "Sábado" },
      ];

     /* useEffect(() => {
        const fetchMedicos = async () => {
          try {
            const response = await fetch("http://localhost:3000/medico");
            const medicos = await response.json();
            setMatriculasDisponibles(medicos.map((medico) => medico.matricula)); // Extraer solo las matrículas
          } catch (err) {
            console.error("Error al cargar las matrículas:", err);
          }
        };
    
        fetchMedicos();
      }, []);*/

      
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(matricula=='' || dia == '' || horaInicio == '' || horaFin == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'POST',{matricula,dia,horaInicio,horaFin})
    }
    return(
      <>
          {
              routerData && (
                  <div className="form-ById">
                      <form onSubmit={handleSubmit}>
                          {routerData.items &&  
                                  routerData.items.map((item, index) => (
                                      item.type === 'date' ? <input key={index} name={item.name} type="date" placeholder={item.name} onChange={handleChange}/> : 
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