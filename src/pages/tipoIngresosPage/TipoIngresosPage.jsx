import { useState } from "react"

export const TipoIngresosPage = () =>{
    const [fecha, setFecha] = useState(null)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(fecha)
    }

    return(
        <>  
        <form onSubmit={handleSubmit}>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
            <label>
                <button type="submit">Enviar</button>
            </label> 
        </form>
        </>
    )
}