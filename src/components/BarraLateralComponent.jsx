import {useNavigate } from "react-router-dom"
import { sections } from "../sections"

export const BarraLateralComponent = () =>{
    const navigate = useNavigate()
    const handleClick = (route)=>{
        console.log(route)
    }
    return (
        <>
           {sections.map((section)=>{
                return(
                    <div className="index-section" onClick={()=> navigate(section.route)}>{section.name}</div>
                )
            }
           )}
        </>
    )
}