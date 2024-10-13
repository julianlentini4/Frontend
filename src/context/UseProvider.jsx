import { useState } from "react"
import { UserContext } from "./UseContext"

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({})
    const [isLogged,setIsLogged] = useState(false)
    return(
        <UserContext.Provider value={{user, setUser, isLogged, setIsLogged}}>
            {children}
        </UserContext.Provider>
    )
}