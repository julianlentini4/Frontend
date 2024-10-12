import {useContext, useState } from "react";
import { Navigate, useLocation} from "react-router-dom";
import { ViewOrder } from "./ViewOrder";
import { OrderConfirm } from "./OrderConfirm";
import { UserContext } from "../../context/UseContext";

export const PagoPage = () =>{

    const location = useLocation();
    const [isConfirm, setIsConfirm] = useState(false)
    const {user,isLogged}= useContext(UserContext)
    const { productoElegido } = location.state || {};
    console.log(productoElegido)

    return(
        <>
            {!isLogged && <Navigate to={'/login'}/>}
            {isConfirm ? <OrderConfirm user={user} productoElegido={productoElegido}/> : <ViewOrder user={user} setIsConfirm={setIsConfirm} productoElegido={productoElegido}/>}
        </>
    )
}