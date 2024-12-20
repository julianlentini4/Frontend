
export const AutoTablaComponent = ({data}) =>{
    console.log(data)
    return(
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
                            {data.map((datos)=>{
                                return <tr>{Object.keys(datos).map((prop)=>{
                                    return <td>{datos[prop]}</td>
                                })}</tr>
                            })
                            }
                        </tbody>
                </table>
    )
}