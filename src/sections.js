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
        }]
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
        }]
    }
]