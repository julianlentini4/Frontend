import { useContext, useState } from "react";
import { RouterContext } from "../../context/UseContext";
import { useFetch } from "../../hooks/useFetch";

export const CreateAgendaPage = ({ endpoint }) => {
  const { routerData } = useContext(RouterContext);
  const { data, fetchData, isLoading, error } = useFetch();
  const [matricula, setMatricula] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [validate, setValidate] = useState(true);

  const handleChange = (e) => {
    setValidate(true);
    const { name, value } = e.target;
    if (name === "matricula") setMatricula(parseInt(value));
    if (name === "dia") setDia(parseInt(value));
    if (name === "horaInicio") setHoraInicio(value);
    if (name === "horaFin") setHoraFin(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (matricula === "" || dia === "" || horaInicio === "" || horaFin === "") {
      setValidate(false);
      return;
    }
    fetchData(`http://localhost:3000${endpoint}`, "POST", {
      matricula,
      dia,
      horaInicio,
      horaFin,
    });
  };

  return (
    <>
      {routerData && (
        <div className="form-ById">
          <form onSubmit={handleSubmit}>
            <label>Matricula:</label>
            <input
              type="number"
              name="matricula"
              value={matricula}
              onChange={handleChange}
              required
            />
            <label>Día:</label>
            <input
              type="number"
              name="dia"
              value={dia}
              onChange={handleChange}
              required
            />
            <label>Hora Inicio:</label>
            <input
              type="time"
              name="horaInicio"
              value={horaInicio}
              onChange={handleChange}
              required
            />
            <label>Hora Fin:</label>
            <input
              type="time"
              name="horaFin"
              value={horaFin}
              onChange={handleChange}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      {!isLoading && data ? data.message : <>{error}</>}
      {!validate && <p className="error">Los campos son requeridos</p>}
    </>
  );
};
