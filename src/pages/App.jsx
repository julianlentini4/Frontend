import ProtectedRoute from "./protected/ProtectedRoute"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePageClient } from "./homePage/homePageClient"
import { LoginApp } from "./loginPage/loginApp"
import { UserProvider } from "../context/UseProvider"
import { NavBarComponent } from "../components/NavBarComponent"
import {EstructuraComponent } from "../components/EstructuraComponent"
import { InformesPage } from "./informesPage/InformesPage"
import { TipoIngresosPage } from "./tipoIngresosPage/TipoIngresosPage"

export const App = () => {
    return (
        <UserProvider>
            <NavBarComponent/>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route element={<EstructuraComponent/>}>
                        <Route path="/home" element={<HomePageClient/>}></Route>  
                        <Route path="/informes" element={<InformesPage/>}></Route>  
                        <Route path="/tipoIngresos" element={<TipoIngresosPage/>}></Route>  
                    </Route>
                </Route>
                <Route path="/login" element={<LoginApp endpoint={"users"}/>}></Route>
                <Route path="/*" element={<Navigate to='/login' />}></Route>
            </Routes>
        </UserProvider>
    )
}