import React from "react";
import { GetAllComponentAgenda } from "./GetAllComponentAgenda";

export const AutoTablaComponentAgenda = ({ data, onDelete}) => {

  const handleDelete = async (idAgendaDia) => {
    try {
      const response = await fetch(`http://localhost:3000/agenda/${idAgendaDia}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Agenda eliminada exitosamente.");
        window.location.reload()
        fetchData();
      } else {
        console.log("Error al eliminar la agenda.");
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const groupedData = data.reduce((acc, item) => {
    const { idAgenda, matricula, idAgendaDia, dia, horaInicio, horaFin } = item;

    if (!acc[idAgenda]) {
      acc[idAgenda] = {
        matricula,
        rows: [],
      };
    }
    acc[idAgenda].rows.push({ idAgendaDia, dia, horaInicio, horaFin });
    return acc;
  }, {});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  data = data.map(item => {
    return {
      idAgenda:item.idAgenda,
      matricula:item.matricula,
      idAgendaDia:item.idAgendaDia,
      dia:item.dia,
      horaInicio:item.horaInicio,
      horaFin:item.horaFin
    }
  })

  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(data[0]).map((prop) => (
            <th key={prop}>{prop}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([idAgenda, { matricula, rows }]) => (
          <React.Fragment key={idAgenda}>
            <tr>
              <td rowSpan={rows.length}>{idAgenda}</td>
              <td rowSpan={rows.length}>{matricula}</td>
              <td>{rows[0].idAgendaDia}</td>
              <td>{formatDate(rows[0].dia)}</td>
              <td>{rows[0].horaInicio}</td>
              <td>{rows[0].horaFin}</td>
              <td rowSpan={rows.length}>
              <button className="delete-button" onClick={() => handleDelete(idAgenda)}>
                 <span className="material-symbols-outlined">delete</span></button>
              </td>
            </tr>
            {rows.slice(1).map((row, index) => (
              <tr key={`${idAgenda}-${index}`}>
                <td>{row.idAgendaDia}</td>
                <td>{formatDate(row.dia)}</td>
                <td>{row.horaInicio}</td>
                <td>{row.horaFin}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
