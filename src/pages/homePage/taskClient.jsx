export const TaskClient = ({task, index, key}) =>{
    return(
        <tr key={key}>
            <th scope="row">{index+1}</th>
            <th scope="row">{task.id}</th>
            <td>{task.title}</td>
            <td>{task.completed ? 'Completado' : 'Pendiente'}</td>
        </tr>
    )
}