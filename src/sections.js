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
                nombre:'Tipos de Ingresos',
                subroute:'/buscarIngresoId',
            }]
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
    }
]