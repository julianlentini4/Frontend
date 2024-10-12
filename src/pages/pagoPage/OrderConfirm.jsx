import { useNavigate } from "react-router-dom"

export const OrderConfirm = ({user , productoElegido}) =>{
    const navigate = useNavigate()

    return(
        <>
            <h1>{user.name}</h1>
            <h2> ¡USTED CONFIRMO EL PEDIDO! </h2>
            <hr/>
            <p>Detalle de su Compra:</p>
            <p>{productoElegido.name}  <b>${productoElegido.cost}</b></p>
            <h3>Estado del pedido: En Proceso</h3>
            <p>Aguarde la confirmación del mismo</p>
            <button onClick={() =>navigate('/home')}>Volver al menu principal</button>
        </>
    )
}