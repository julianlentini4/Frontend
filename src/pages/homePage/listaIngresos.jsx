export const ListaIngresos = ({data, index, key}) =>{
    return(
        <tr key={key}>
            <th scope="row">{index+1}</th>
            <td>{data.idIngreso}</td>
            <td>{data.tipo}</td>
            <td>{data.descripcion}</td>
        </tr>
    )
}