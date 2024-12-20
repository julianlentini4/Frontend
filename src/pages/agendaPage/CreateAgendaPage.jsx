import { useContext, useState } from "react";
import { RouterContext } from "../../context/UseContext";
import { useFetch } from "../../hooks/useFetch";

export const CreateAgendaPage = ({ endpoint }) => {
  const { routerData } = useContext(RouterContext);
  const { data, fetchData, isLoading, error } = useFetch();

  const [matricula, setMatricula] = useState("");
  const [tipo, setTipo] = useState("");
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
    } else {
      if (name === "matricula") setMatricula(value);
      if (name === "tipo") setTipo(value);
    }
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
      // Crear la Agenda
      const agendaResponse = await fetch("http://localhost:3000/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matricula, tipo }),
      });

      const agendaData = await agendaResponse.json();

      if (agendaResponse.ok) {
        // Usar el idAgenda generado para crear los días
        const idAgenda = agendaData.idAgenda;

        for (const dia of dias) {
          const diaResponse = await fetch("http://localhost:3000/agendaDia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idAgenda,
              dia: dia.dia,
              horaInicio: dia.horaInicio,
              horaFin: dia.horaFin,
            }),
          });

          if (!diaResponse.ok) {
            console.error("Error al crear el día:", await diaResponse.text());
          }
        }

        alert("Agenda creada exitosamente");
      } else {
        console.error("Error al crear la Agenda:", agendaData.message);
      }
    } catch (error) {
      console.error("Error general:", error);
    }
  };

  return (
    <div>
      <h3>Crear Agenda</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matrícula</label>
          <input
            type="number"
            name="matricula"
            value={matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Agenda</label>
          <input
            type="text"
            name="tipo"
            value={tipo}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Días de la Agenda</h4>
        {dias.map((dia, index) => (
          <div key={index} className="dia-item">
            <select
              name="dia"
              value={dia.dia}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="">Seleccione un día</option>
              <option value="0">Domingo</option>
              <option value="1">Lunes</option>
              <option value="2">Martes</option>
              <option value="3">Miércoles</option>
              <option value="4">Jueves</option>
              <option value="5">Viernes</option>
              <option value="6">Sábado</option>
            </select>
            <input
              name="horaInicio"
              type="time"
              value={dia.horaInicio}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <input
              name="horaFin"
              type="time"
              value={dia.horaFin}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <button type="button" onClick={() => handleRemoveDia(index)}>
              Eliminar Día
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDia}>
          Agregar Día
        </button>
        <button type="submit">Crear Agenda</button>
      </form>

      {!isLoading && data && <p>{data.message}</p>}
      {error && <p className="error">{error}</p>}
      {!validate && <p className="error">Todos los campos son requeridos.</p>}
    </div>
  );
};
