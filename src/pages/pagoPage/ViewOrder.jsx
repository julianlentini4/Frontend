import {useNavigate } from "react-router-dom";

export const ViewOrder = ({user,setIsConfirm,productoElegido}) =>{
    const navigate = useNavigate()
    const handleCancel = ()=>{
        navigate('/home')
    }
    return(
        <>
            <h2>Sr. {user.name}, usted acaba de realizar el siguiente pedido:</h2>
            <p>{productoElegido.name}     ${productoElegido.cost}</p>
            <button onClick={() => setIsConfirm(true) }>Confirmar pedido</button>
            <button onClick={handleCancel}>Cancelar</button>
        </>
    )
}