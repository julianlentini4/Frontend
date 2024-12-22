
import React from "react";

export const AutoTablaComponentAgenda = ({ data }) => {
    // Agrupar datos por idAgenda
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
    return (
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((prop)=>{
              return <th>{[prop]}</th>
            })}
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
                <td>{rows[0].dia}</td>
                <td>{rows[0].horaInicio}</td>
                <td>{rows[0].horaFin}</td>
                <td rowSpan={rows.length}>
                </td>
              </tr>
              {rows.slice(1).map((row, index) => (
                <tr key={`${idAgenda}-${index}`}>
                  <td>{row.idAgendaDia}</td>
                  <td>{row.dia}</td>
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
  

