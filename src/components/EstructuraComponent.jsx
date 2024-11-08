import { Outlet } from "react-router-dom"
import { BarraLateralComponent } from "./BarraLateralComponent"
import '../style/EstructuraComponent.css'

export const EstructuraComponent = () =>{
    return(
        <div className="grid-container">
            <div className="barraLateral">
                <BarraLateralComponent/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}