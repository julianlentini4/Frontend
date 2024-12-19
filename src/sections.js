export const sections = [
    {
        name:'Informes',
        route:'/informes',
        options:[{
            nombre:'Buscar informe',
            subroute:'/buscarInformes'
        },
        {
            nombre:'Informe x ID',
            subroute:'/buscarInformesId',
            items:null
        },
        {
            nombre:'Nuevo Informe',
            subroute:'/crearInforme',
            items:[
                {
                    name:'nroAcceso',
                    type:'number'
                },
                {
                    name:'matricula',
                    type:'number'
                },
                {
                    name:'fechaInicio',
                    type:'date'
                },
                {
                    name:'fechaFirmado',
                    type:'date'
                },
                {
                    name:'estado',
                    type:'text'
                },
                {
                    name:'descripcion',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Borrar informe',
            subroute:'/borrarInforme',
            items:null
        },
        {
            nombre:'Modificar Informe',
            subroute:'/modificarInforme',
            items:null
        }
    ]
    },
    {
        name:'Tipo de Ingresos',
        route:'/tipoIngresos',
        options:[{
                nombre:'Tipos de Ingresos',
                subroute:'/buscarIngreso'
                },
                {
                nombre:'Tipo de Ingresos por ID',
                subroute:'/buscarIngresoId',
                },
                {
                    nombre:'Nuevo Tipo de Ingreso',
                    subroute:'/crearIngreso',
                    items:[
                        {
                            name:'tipo',
                            type:'text'
                        },
                        {
                            name:'descripcion',
                            type:'text'
                        }
                    ]
                },
                {
                    nombre:'Borrar Ingreso',
                    subroute:'/borrarIngreso',
                    items:null
                },
                {
                    nombre:'Modificar Ingreso',
                    subroute:'/modificarIngreso',
                    items:null
                }
        ]
    },
    {
        name:'Usuarios',
        route:'/usuarios',
        options:[{
            nombre:'Buscar usuarios',
            subroute:'/buscarUsuario'
        },
        {
            nombre:'Unico usuario',
            subroute:'/buscarUsuarioId',
            items:[
                {
                    name:'username',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Nuevo Usuario',
            subroute:'/crearUsuario',
            items:[
                {
                    name:'username',
                    type:'text'
                },
                {
                    name:'clave',
                    type:'password'
                },
                {
                    name:'tipo',
                    type:'text'
                },
                {
                    name:'sector',
                    type:'text'
                },
                {
                    name:'descripcion',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Borrar Usuario',
            subroute:'/borrarUsuario',
            items:[
                {
                    name:'username',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Modificar Usuario',
            subroute:'/modificarUsuario',
            items:[
                {
                    name:'username',
                    type:'text'
                }
            ]
        }
        ]
    },
    {
        name:'Pacientes',
        route:'/pacientes',
        options:[{
            nombre:'Buscar pacientes',
            subroute:'/buscarPacientes'
        },
        {
            nombre:'Paciente por DNI',
            subroute:'/buscarPacientesId',
            items:null
        },
        {
            nombre:'Nuevo Paciente',
            subroute:'/crearPaciente',
            items:[
                {
                    name:'dni',
                    type:'number'
                },
                {
                    name:'nombre',
                    type:'text'
                },
                {
                    name:'apellido',
                    type:'text'
                },
                {
                    name:'mail',
                    type:'email'
                },
                {
                    name:'obraSocial',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Borrar paciente',
            subroute:'/borrarPaciente',
            items:null
        },
        {
            nombre:'Modificar Paciente',
            subroute:'/modificarPaciente',
            items:null
        }
    ]
    },
    {
        name:'Medicos',
        route:'/medicos',
        options:[{
            nombre:'Buscar medicos',
            subroute:'/buscarMedicos'
        },
        {
            nombre:'medico por matricula',
            subroute:'/buscarMedicosId',
            items:null
        },
        {
            nombre:'Nuevo medico',
            subroute:'/crearMedico',
            items:[
                {
                    name:'matricula',
                    type:'number'
                },
                {
                    name:'apellido',
                    type:'text'
                },
                {
                    name:'nombre',
                    type:'text'
                },
                {
                    name:'dni',
                    type:'number'
                }
            ]
        },
        {
            nombre:'Borrar medico',
            subroute:'/borrarMedico',
            items:null
        },
        {
            nombre:'Modificar Medico',
            subroute:'/modificarMedico',
            items:null
        }
    ]
    },
    {
        name:'Salas',
        route:'/salas',
        options:[{
            nombre:'Buscar salas',
            subroute:'/buscarSalas'
        },
        {
            nombre:'Sala por numero',
            subroute:'/buscarSalasId',
            items:null
        },
        {
            nombre:'Nueva sala',
            subroute:'/crearSala',
            items:[
                {
                    name:'nroSala',
                    type:'number'
                },
                {
                    name:'estado',
                    type:'text'
                }
            ]
        },
        {
            nombre:'Borrar sala',
            subroute:'/borrarSala',
            items:null
        },
        {
            nombre:'Modificar Sala',
            subroute:'/modificarSala',
            items:null
        }
    ]
    },
    {
        name:'Agendas',
        route:'/agendas',
        options:[{
            nombre:'Buscar agenda',
            subroute:'/buscarAgenda'
        },
        {
            nombre:'Agenda por id',
            subroute:'/buscarAgendaId',
            items:null
        },
        {
            nombre:'Nueva agenda',
            subroute:'/crearAgenda',
            items:[
                {
                    name:'matricula',
                    type:'number'
                },
                {
                    name:'dia',
                    type:'number'
                },
                {
                    name: 'horaIncio',
                    type : 'time'
                },
                {
                    name: 'horaFin',
                    type: 'time'
                }
            ]
        },
        {
            nombre:'Borrar agenda',
            subroute:'/borrarAgenda',
            items:null
        },
        {
            nombre:'Modificar agenda',
            subroute:'/modificarAgenda',
            items:null
        }
    ]
    }
]