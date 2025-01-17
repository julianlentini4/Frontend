import { useContext, useState } from "react";
import { RouterContext } from "../../context/UseContext";
import { useFetch } from "../../hooks/useFetch";
import { format, addMinutes, parseISO, subHours } from "date-fns";
import toast from "react-hot-toast";


export const CreateAgendaPage = ({ endpoint }) => {
  const { routerData } = useContext(RouterContext);
  const { data, fetchData, isLoading, error } = useFetch();
  const [matricula, setMatricula] = useState("");
  const [dias, setDias] = useState([{ dia: "", horaInicio: "", horaFin: "" }]);
  const [validate, setValidate] = useState(true);

  const agendaUrl = `http://localhost:3000${endpoint}`;
  const agendaDiaUrl = `${agendaUrl}Dia`;

  const handleChange = (e, index = null) => {
    setValidate(true);
    const { name, value } = e.target;

    if (index !== null) {
      const newDias = [...dias];
      newDias[index][name] = value;
      setDias(newDias);
    } 
    // else {
    //   if (name === "matricula") setMatricula(parseInt(value));
    // }
    if(name === 'matricula') setMatricula(parseInt(value))
  };

  const handleAddDia = () => {
    setDias([...dias, { dia: "", horaInicio: "", horaFin: "" }]);
  };

  const handleRemoveDia = (index) => {
    const newDias = dias.filter((_, i) => i !== index);
    setDias(newDias);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const mat = parseInt(matricula, 10);
      const agendaResponse = await fetch("http://localhost:3000/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricula: mat }),
      });
  
      const agendaData = await agendaResponse.json();
  
      if (agendaResponse.ok) {
        for (const dia of dias) {
          const turnos = [];
          let currentTime = new Date(`${dia.dia}T${dia.horaInicio}`);
          const endTime = new Date(`${dia.dia}T${dia.horaFin}`);
  
          while (currentTime < endTime) {
            const nextTime = new Date(currentTime.getTime() + 15 * 60000);
            if (nextTime <= endTime) {
              turnos.push({
                dia: dia.dia,
                horaInicio: currentTime.toISOString().substring(11, 16),
                horaFin: nextTime.toISOString().substring(11, 16),
              });
            }
            currentTime = nextTime;
          }
  
          for (const turno of turnos) {
            const diaResponse = await fetch("http://localhost:3000/agendaDia", {
              method: "POST",
              headers: { "Content-Type": "application/json" }, 
              body: JSON.stringify(turno),
            });
            if (!diaResponse.ok) {
              console.error("Error al crear el turno:", await diaResponse.text());
            }
          }
        }
        toast.success('Agenda creada con exito')
      } else {
        toast.error("Error al crear agenda",{agendaData})
      }
    } catch (error) {
      toast.error("Error al crear agenda",error)
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const mat = parseInt(matricula, 10);
  //     await fetch("http://localhost:3000/agenda", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ matricula: mat }),
  //     });
  
  //     const agendaData = await agendaResponse.json();
  
  //     if (agendaResponse.ok) {
  //       for (const dia of dias) {
  //         const turnos = [];
  //         let currentTime = subHours(parseISO(`${dia.dia}T${dia.horaInicio}`),0);
  //         const endTime = subHours(parseISO(`${dia.dia}T${dia.horaFin}`),0);
  
  //         while (currentTime < endTime) {
  //           const nextTime = addMinutes(currentTime, 15);
  //           if (nextTime <= endTime) {
  //             turnos.push({
  //               dia: dia.dia,
  //               horaInicio: format(currentTime, "HH:mm"),
  //               horaFin: format(nextTime, "HH:mm"),
  //             });
  //           }
  //           currentTime = nextTime;
  //         }
  
  //         for (const turno of turnos) {
  //           const diaResponse = await fetch("http://localhost:3000/agendaDia", "POST", { "Content-Type": "application/json" }, JSON.stringify(turno));
  //           if (!diaResponse.ok) {
  //             console.error("Error al crear el turno:", await diaResponse.text());
  //           }
  //         }
  //       }
  //       toast.success('Successfully toasted!')
  //     } else {
  //       console.error("Error al crear la Agenda:", agendaData.message);
  //     }
  //   } catch (error) {
  //     console.error("Error general:", error);
  //   }
  // };
  

  return (
    <div>
      <h3>Crear Agenda</h3>
      <form onSubmit={handleSubmit}>
          <input type="number" name="matricula" placeholder = "Matricula" value={parseInt(matricula)} onChange={handleChange} required />
        <h4>Dias de la agenda</h4>
        {dias.map((dia, index) => (
          <div key={index} className="dia-item">
            <input type="date" name="dia" value={dia.dia} onChange={(e) => handleChange(e, index)} required/>
            <input name="horaInicio" type="time" value={dia.horaInicio} onChange={(e) => handleChange(e, index)} required/>
            <input name="horaFin" type="time" value={dia.horaFin} onChange={(e) => handleChange(e, index)} required/>

            <button type="button" onClick={() => handleRemoveDia(index)}> Eliminar Día
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDia}> Agregar Día
        </button>
        <button type="submit">Crear Agenda</button>
      </form>

      {!isLoading && 
                data ? data.message : <>{error}</>}
            {!validate && <p className="error">Los campos son requeridos</p>}
    </div>
  );
};
