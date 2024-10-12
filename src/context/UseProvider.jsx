import { useState } from "react"
import { UserContext } from "./UseContext"

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({})
    const [isLogged,setIsLogged] = useState(false)
    const [pageDirection,setPageDirection] = useState('')
    return(
        <UserContext.Provider value={{user, setUser, isLogged, setIsLogged, pageDirection, setPageDirection}}>
            {children}
        </UserContext.Provider>
    )
}