import { useContext, useEffect, useState } from "react"
import { RouterContext } from "../../context/UseContext"
import { useFetch } from "../../hooks/useFetch"
import { use } from "react"

export const CreateTurnoPage = ({endpoint}) => {
    const {routerData} = useContext(RouterContext)
    const {data, fetchData, isLoading, error} = useFetch()
    const [dni, setDni] = useState()
    const [especialidad, setEspecialidad] = useState([])
    const [idEspecialidad, setIdEspecialidad] = useState("")
    const [agenda, setAgenda] = useState([])
    const [validate, setValidate] = useState(true)

    const handleChangeEspecialidad = (e) => {
        setValidate(true);
        const { value } = e.target;
        setIdEspecialidad(value);
      };
    
    const handleChangeDni = (e) => {
        setValidate(true);
        setDni(e.target.value); // Actualiza el estado con el DNI ingresado
    };      

    useEffect(() => {
        const loadEspecialidades = async () => {
          try {
            const response = await fetch(`http://localhost:3000/especialidad`)
            const result = await response.json();
            const especialidadesArray = Object.values(result)
            setEspecialidad(especialidadesArray);
          } catch (err) {
            console.error("Error al cargar especialidades:", err)
          }
        }
        loadEspecialidades()
      }, []);
      
    useEffect(() => {
        const loadAgendas = async () => {
          try {
            const response = await fetch(`http://localhost:3000/agenda`)
            const result = await response.json();
            const agendasArray = Object.values(result)
            setAgenda(agendasArray);
          } catch (err) {
            console.error("Error al cargar agendas:", err)
          }
        }
        loadAgendas()
      }, []);

    useEffect(() => {
      const loadEspecialidades = async () => {
        try {
          const response = await fetch(`http://localhost:3000/especialidad`)
          const result = await response.json();
          const especialidadesArray = Object.values(result)
          setEspecialidad(especialidadesArray);
        } catch (err) {
          console.error("Error al cargar especialidades:", err)
        }
      }
      loadEspecialidades()
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isNaN(dni) || isNaN(matricula) || fecha == '' || hora == ''){
            setValidate(false)
            return
        }
        fetchData(`http://localhost:3000${endpoint}`,'POST',{dni,matricula,fecha,hora})
    }
    return(
        <>  
            <form onSubmit={handleSubmit}>
            <input type="number" name="dni" placeholder = "DNI" value={parseInt(dni)} onChange={handleChangeDni} required />
            <br />
                <select name="idEspecialidad" id="especialidad" value={idEspecialidad} onChange={handleChangeEspecialidad}>
                <option value="" disabled> {"Seleccione una especialidad"} </option>
                {especialidad.map((especialidad) => (
                    <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>
                    {especialidad.nombre}
                    </option>
                ))}
                </select>
            <br /> 

                    <button type="submit">Generar Turno</button>
            </form>

            {!isLoading && 
                data ? data.message : <>{error}</>}
            {!validate && <p className="error">Los campos son requeridos</p>}
        </>
    )
}
