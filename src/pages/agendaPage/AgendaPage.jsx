import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AgendaPage = ({ data2, endpoint }) => {
  const { data, fetchData, isLoading, error } = useFetch();
  const [matricula, setMatricula] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [validate, setValidate] = useState(true);


  useEffect(() => {
    if (data2.length > 0) {
      const item = data2[0];
      setMatricula(item.matricula || "");
      setDia(item.dia || "");
      setHoraInicio(item.horaInicio || "");
      setHoraFin(item.horaFin || "");
    }
  }, [data2]);


  const handleChange = (e) => {
    setValidate(true);
    const { name, value } = e.target;
    if (name === "matricula") setMatricula(value);
    if (name === "dia") setDia(value);
    if (name === "horaInicio") setHoraInicio(value);
    if (name === "horaFin") setHoraFin(value);
  };

  // Validación y envío de datos
  const handleClick = () => {
    if (matricula === "" || dia === "" || horaInicio === "" || horaFin === "" || isNaN(matricula) || isNaN(dia)) {
      setValidate(false);
      return;
    }
    fetchData(`http://localhost:3000${endpoint}`, "PUT", {matricula,dia,horaInicio,horaFin,});
  };

  // Renderizado
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data2[0]).map((prop, index) => (
              <th key={index}>{prop}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(data2[0]).map((prop, index) => {
              if (prop === "matricula") {
                return (
                  <td key={index}>
                    <input type="number" name={prop} onChange={handleChange} value={matricula} readOnly/>
                  </td>
                );
              }
              if (prop === "dia") {
                return (
                  <td key={index}>
                    <input
                      type="number"
                      name={prop}
                      onChange={handleChange}
                      value={dia}
                    />
                  </td>
                );
              }
              if (prop === "horaInicio") {
                return (
                  <td key={index}>
                    <input type="text" name={prop} onChange={handleChange} value={horaInicio}/>
                  </td>
                );
              }
              if (prop === "horaFin") {
                return (
                  <td key={index}>
                    <input
                      type="text"
                      name={prop}
                      onChange={handleChange}
                      value={horaFin}
                    />
                  </td>
                );
              }
              return <td key={index}></td>;
            })}
          </tr>
        </tbody>
      </table>

      <button onClick={handleClick}>Modificar</button>

      {!isLoading && data && <p>{data.message}</p>}
      {error && <p className="error">{error}</p>}
      {!validate && <p className="error">Todos los campos son requeridos.</p>}
    </>
  );
};
