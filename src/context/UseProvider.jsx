import { useState } from "react"
import { RouterContext, UserContext } from "./UseContext"

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({})
    const [isLogged,setIsLogged] = useState(false)
    return(
        <UserContext.Provider value={{user, setUser, isLogged, setIsLogged}}>
            {children}
        </UserContext.Provider>
    )
}

export const RouterProvider = ({children})=>{
    const [routerData,setRouterData] = useState(null)
    return(
        <RouterContext.Provider value={{routerData,setRouterData}}>
            {children}
        </RouterContext.Provider>
    )
}