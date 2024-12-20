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
import { UpdateInformePage } from "./informesPage/UpdateInformePage"
import { CreateInformePage } from "./informesPage/CreateInformePage"
import { UpdateUsersPage } from "./usersPage/UpdateUsersPage"
import { UpdateTipoIngresosPage } from "./tipoIngresosPage/UpdateTipoIngresosPage"
import { CreatePacientePage } from "./pacientePage/CreatePacientePage"
import { UpdatePacientePage } from "./pacientePage/UpdatePacientePage"
import { CreateMedicoPage } from "./medicoPage/CreateMedicoPage"
import { UpdateMedicoPage } from "./medicoPage/UpdateMedicoPage"
import { CreateSalaPage } from "./salaPage/CreateSalaPage"
import { UpdateSalaPage } from "./salaPage/UpdateSalaPage"
import { CreateAgendaPage } from "./agendaPage/CreateAgendaPage"
import { UpdateAgendaPage } from "./agendaPage/UpdateAgendaPage"

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
                                    <Route path="crearInforme" element={<CreateInformePage endpoint={'/informe'}/>}></Route>
                                    <Route path="borrarInforme" element={<DeleteComponent endpoint={'/informe/'}/>}></Route>
                                    <Route path="modificarInforme" element={<UpdateInformePage endpoint={'/informe/'}/>}></Route>
                                </Route>  
                                <Route path="/tipoIngresos" element={<GlobalComponent datos={sections[1]}/>}>
                                    <Route path="buscarIngreso" element={<GetAllComponent endpoint={'/ingreso'}/>}></Route>
                                    <Route path="buscarIngresoId" element={<GetByIdComponent endpoint={'/ingreso/'}/>}></Route>
                                    <Route path="crearIngreso" element={<CreateComponent endpoint={'/ingreso'}/>}></Route>
                                    <Route path="borrarIngreso" element={<DeleteComponent endpoint={'/ingreso/'}/>}></Route>
                                    <Route path="modificarIngreso" element={<UpdateTipoIngresosPage endpoint={'/ingreso/'}/>}></Route>
                                </Route>  
                                <Route path="/usuarios" element={<GlobalComponent datos={sections[2]}/>}>
                                    <Route path="buscarUsuario" element={<GetAllComponent endpoint={'/users'}/>}></Route>
                                    <Route path="buscarUsuarioId" element={<GetByIdComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="crearUsuario" element={<CreateComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="borrarUsuario" element={<DeleteComponent endpoint={'/users/'}/>}></Route>
                                    <Route path="modificarUsuario" element={<UpdateUsersPage endpoint={'/users/'}/>}></Route>
                                </Route>
                                <Route path="/pacientes" element={<GlobalComponent datos={sections[3]}/>}>
                                    <Route path="buscarPacientes" element={<GetAllComponent endpoint={'/paciente'}/>}></Route>
                                    <Route path="buscarPacientesId" element={<GetByIdComponent endpoint={'/paciente/'}/>}></Route>
                                    <Route path="crearPaciente" element={<CreatePacientePage endpoint={'/paciente/'}/>}></Route>
                                    <Route path="borrarPaciente" element={<DeleteComponent endpoint={'/paciente/'}/>}></Route>
                                    <Route path="modificarPaciente" element={<UpdatePacientePage endpoint={'/paciente/'}/>}></Route>
                                </Route>
                                <Route path="/medicos" element={<GlobalComponent datos={sections[4]}/>}>
                                    <Route path="buscarMedicos" element={<GetAllComponent endpoint={'/medico'}/>}></Route>
                                    <Route path="buscarMedicosId" element={<GetByIdComponent endpoint={'/medico/'}/>}></Route>
                                    <Route path="crearMedico" element={<CreateMedicoPage endpoint={'/medico/'}/>}></Route>
                                    <Route path="borrarMedico" element={<DeleteComponent endpoint={'/medico/'}/>}></Route>
                                    <Route path="modificarMedico" element={<UpdateMedicoPage endpoint={'/medico/'}/>}></Route>
                                </Route>
                                <Route path="/salas" element={<GlobalComponent datos={sections[5]}/>}>
                                    <Route path="buscarSalas" element={<GetAllComponent endpoint={'/sala'}/>}></Route>
                                    <Route path="buscarSalasId" element={<GetByIdComponent endpoint={'/sala/'}/>}></Route>
                                    <Route path="crearSala" element={<CreateSalaPage endpoint={'/sala/'}/>}></Route>
                                    <Route path="borrarSala" element={<DeleteComponent endpoint={'/sala/'}/>}></Route>
                                    <Route path="modificarSala" element={<UpdateSalaPage endpoint={'/sala/'}/>}></Route>
                                </Route>
                                <Route path="/agendas" element={<GlobalComponent datos={sections[6]}/>}>
                                    <Route path="buscarAgenda" element={<GetAllComponent endpoint={'/agenda'}/>}></Route>
                                    <Route path="buscarAgendaId" element={<GetByIdComponent endpoint={'/agenda/'}/>}></Route>
                                    <Route path="crearAgenda" element={<CreateAgendaPage endpoint={'/agenda/'}/>}></Route>
                                    <Route path="borrarAgenda" element={<DeleteComponent endpoint={'/agenda/'}/>}></Route>
                                    <Route path="modificarAgenda" element={<UpdateAgendaPage endpoint={'/agenda/'}/>}></Route>
                                </Route>
                                <Route path="/agendasDias" element={<GlobalComponent datos={sections[7]}/>}>
                                    <Route path="buscarAgendaDia" element={<GetAllComponent endpoint={'/agendaDia'}/>}></Route>
                                    <Route path="buscarAgendaDiaId" element={<GetByIdComponent endpoint={'/agendaDia/'}/>}></Route>
                                    <Route path="crearAgendaDia" element={<CreateAgendaPage endpoint={'/agendaDia/'}/>}></Route>
                                    <Route path="borrarAgendaDia" element={<DeleteComponent endpoint={'/agendaDia/'}/>}></Route>
                                    <Route path="modificarAgendaDia" element={<UpdateAgendaPage endpoint={'/agendaDia/'}/>}></Route>
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
