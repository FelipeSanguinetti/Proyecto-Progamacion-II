const data = {
    usuarios: {
        usuario: 'juanperez',
        nombre: 'Juan',
        apellido: 'Pérez',
        mail: 'juanperez@gmail.com',
        profile: '/images/users/juanperez.jpg'
    },
    comentarios: [{
        content: 'Que rica pizza!',
        user: 'juanperez',
        photo: '/images/users/juanperez.jpg',
    },
    {
        content: 'Que buena foto',
        user: 'juanperez',
        photo: '/images/users/juanperez.jpg',
    },
    {
        content: 'Me encanta!',
        user: 'juanperez',
        photo: '/images/users/juanperez.jpg',
    },
    {
        content: 'Que buenos colores',
        user: 'juanperez',
        photo: '/images/users/juanperez.jpg',
    },
    {
        content: 'Que pinta!!',
        user: 'juanperez',
        photo: '/images/users/juanperez.jpg',
    }],
    
    products: [
    {
        id: 1,
        tipo: 'pizza',
        imagen: '/images/products/cabutia azul.png',
        nombre: 'Cabutia Azul',
        descripcion: 'Pizza napoletana de fior di latte, cabutia, queso azul y albahaca.',
        fecha: 24/8/2021
    }, {
        id: 2,
        tipo: 'pizza',
        imagen: '/images/products/mortachio.png',
        nombre: 'Mortacchio',
        descripcion:'Pizza napoletana de fior di latte, mortadela y pistacchios.' ,
        fecha: 05/02/2022
    }, {
        id: 3,
        tipo: 'pizza',
        imagen: '/images/products/calzone.png',
        nombre: 'Calzone',
        descripcion: 'Especialidad de la cocina italiana elaborado igual que la pizza pero completamente cerrado y relleno con fior di latte, cherrys, nduja, mortadela y albahaca.',
        fecha: 31/07/2019
    }, {
        id: 4,
        tipo: 'pizza',
        imagen: '/images/products/pesto.png',
        nombre: 'Pesto',
        descripcion: 'Pizza napoletana de fior di latte, tomates cherry, sobre una salsa pesto hecha con albahaca y ajo.',
        fecha: 09/12/2020
    }, {
        id: 5,
        tipo: 'pizza',
        imagen: '/images/products/peperoni.png',
        nombre: 'Pepperoni',
        descripcion: 'Pizza napoletana de fior di latte y pepperoni. El pepperoni generalmente está hecho de una mezcla de carne de cerdo y carne de res.',
        fecha: 11/09/2019
    }, {
        id: 6,
        tipo: 'pasta',
        imagen: '/images/products/garganelli.png',
        nombre: 'Garganelli',
        descripcion: 'Garganelli all’ uovo con pomodoro de ‘Nduja',
        fecha: 15/11/2021
    }, {
        id: 7,
        tipo: 'pasta',
        imagen: '/images/products/tortellini.png',
        nombre: 'Tortellini',
        descripcion: 'Tortellini relleno de cabutia, queso azul y nuez, con manteca de salvia y almendras.',
        fecha: 06/08/2019
    }, {
        id: 8,
        tipo: 'pasta',
        imagen: '/images/products/cavatelli.png',
        nombre: 'Cavatelli',
        descripcion: 'Cavatelli de remolacha con manteca de girgolas.',
        fecha: 17/10/2018
    }, {
        id: 9,
        tipo: 'pasta',
        imagen: '/images/products/cestini.png',
        nombre:'Cestini' ,
        descripcion: 'Cestini rellenos de papa, tomillo, parmesano y ricota con manteca de avellanas.',
        fecha: 06/01/2018
    }, {
        id: 10,
        tipo: 'pasta',
        imagen: '/images/products/Strozzapretti.png',
        nombre: 'Strozzapretti',
        descripcion: 'Strozzapretti con bolognesa de bondiola, acompañado con una focaccia.',
        fecha: 04/11/2020
    },
]
}



module.exports = {
    usuarios: data.usuarios,
    comentarios: data.comentarios,
    products: data.products
}