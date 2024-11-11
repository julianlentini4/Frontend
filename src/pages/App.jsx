import ProtectedRoute from "./protected/ProtectedRoute"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePageClient } from "./homePage/homePageClient"
import { LoginApp } from "./loginPage/loginApp"
import { RouterProvider, UserProvider } from "../context/UseProvider"
import {EstructuraComponent } from "../components/EstructuraComponent"
import { GlobalComponent } from "../components/GlobalComponent"
import { sections } from "../sections"
import { GetAllComponent } from "../components/GetAllComponent"
import { GetByIdComponent } from "../components/GetByIdComponent"
import { CreateComponent } from "../components/CreateComponent"
import { DeleteComponent } from "../components/DeleteComponent"
import { UpdateComponent } from "../components/UpdateComponent"

export const App = () => {
    return (
        <UserProvider>
            <RouterProvider>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<EstructuraComponent/>}>
                            <Route path="/home" element={<HomePageClient/>}></Route>  
                                <Route path="/informes" element={<GlobalComponent datos={sections[0]}/>}>
                                    <Route path="buscarInformes" element={<GetAllComponent endpoint={'/informe'}/>}></Route>
                                    <Route path="buscarInformesId" element={<GetByIdComponent endpoint={'/informe/'}/>}></Route>
                                    <Route path="crearInforme" element={<CreateComponent endpoint={'/informe'}/>}></Route>
                                    <Route path="borrarInforme" element={<DeleteComponent endpoint={'/informe/'}/>}></Route>
                                    <Route path="modificarInforme" element={<UpdateComponent endpoint={'/informe/'}/>}></Route>
                                </Route>  
                                <Route path="/tipoIngresos" element={<GlobalComponent datos={sections[1]}/>}>
                                    <Route path="buscarIngreso" element={<GetAllComponent endpoint={'/ingreso'}/>}></Route>
                                    <Route path="buscarIngresoId" element={<GetByIdComponent endpoint={'/ingreso/'}/>}></Route>
                                </Route>  
                                <Route path="/usuarios" element={<GlobalComponent datos={sections[2]}/>}>
                                    <Route path="buscarUsuario" element={<GetAllComponent endpoint={'/users'}/>}></Route>
                                    <Route path="buscarUsuarioId" element={<GetByIdComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="crearUsuario" element={<CreateComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="borrarUsuario" element={<DeleteComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="modificarUsuario" element={<UpdateComponent endpoint={'/users/'}/>}></Route>
                                </Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={<LoginApp/>}></Route>
                    <Route path="/*" element={<Navigate to='/login'/>}></Route>
                </Routes>
            </RouterProvider>
        </UserProvider>
    )
}
