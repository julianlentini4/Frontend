import { Outlet } from "react-router-dom"
import { BarraLateralComponent } from "./BarraLateralComponent"
import '../style/EstructuraComponent.css'
import { NavBarComponent } from "./NavBarComponent"

export const EstructuraComponent = () =>{
    return(
        <>
            <NavBarComponent/>
            <div className="grid-container">
                <div className="barraLateral">
                    <BarraLateralComponent/>
                </div>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}