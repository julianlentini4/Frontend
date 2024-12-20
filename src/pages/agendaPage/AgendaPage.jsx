import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AgendaPage = ({ endpoint }) => {
  const { fetchData, isLoading, error } = useFetch();
  const [agendas, setAgendas] = useState([]);
  const [validate, setValidate] = useState(true);

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        if (!response.ok) {
          throw new Error("Error al obtener las agendas");
        }
        const agendasData = await response.json();
        setAgendas(agendasData); // Se espera que el backend devuelva agendas con sus AgendaDias
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchAgendas();
  }, [endpoint]);

  const handleChange = (e) => {
    setValidate(true);
    const { name, value } = e.target;
    // Implementar cambios según las necesidades futuras
  };

  return (
    <>
      <h3>Agendas</h3>

      {isLoading && <p>Cargando...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!isLoading && agendas.length === 0 && <p>No hay agendas disponibles.</p>}

      {!isLoading && agendas.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Tipo</th>
              <th>Días Relacionados</th>
            </tr>
          </thead>
          <tbody>
            {agendas.map((agenda) => (
              <tr key={agenda.idAgenda}>
                <td>{agenda.matricula}</td>
                <td>{agenda.tipo}</td>
                <td>
                  <table className="table-inner">
                    <thead>
                      <tr>
                        <th>Día</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agenda.agendaDias.map((dia, index) => (
                        <tr key={index}>
                          <td>
                            {[
                              "Domingo",
                              "Lunes",
                              "Martes",
                              "Miércoles",
                              "Jueves",
                              "Viernes",
                              "Sábado",
                            ][dia.dia]}
                          </td>
                          <td>{dia.horaInicio}</td>
                          <td>{dia.horaFin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!validate && <p className="error">Todos los campos son requeridos.</p>}
    </>
  );
};
