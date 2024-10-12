import { Navigate, Route, Routes } from "react-router-dom"
import { HomePageClient } from "./homePage/homePageClient"
import { LoginApp } from "./loginPage/loginApp"
import { UserProvider } from "../context/UseProvider"
import { NavBarComponent } from "../components/NavBarComponent"
import ProtectedRoute from "./protected/ProtectedRoute"

export const App = () => {
    return (
        <UserProvider>
            <NavBarComponent/>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<HomePageClient/>}></Route>  
                </Route>
                {/*<Route path="/client" element={<HomePageClient/>}></Route>*/}
                <Route path="/login" element={<LoginApp endpoint={"users"}/>}></Route>
                <Route path="/*" element={<Navigate to='/login' />}></Route>
            </Routes>
        </UserProvider>
    )
}