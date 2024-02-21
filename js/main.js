//PRODUCTOS

const productos = [
    //Camperas
    {
        id: "CAMPERA-DE-DAMA-IMPORTADA",
        titulo: "CAMPERA DE DAMA IMPORTADA",
        imagen: "./img/camperas/CAMPERA-DE-DAMA-IMPORTADA.webp",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 40000
    },
    {
        id: "CAMPERA-MICRO-FIBRA",
        titulo: "CAMPERA MICRO FIBRA",
        imagen: "./img/camperas/CAMPERA-MICRO-FIBRA.webp",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 40000
    },
    {
        id: "CAMPERA-RUN-CABALLERO",
        titulo: "CAMPERA RUN CABALLERO",
        imagen: "./img/camperas/CAMPERA-RUN-CABALLERO.webp",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 40000
    },
    {
        id: "CAMPERA-RUN",
        titulo: "CAMPERA RUN",
        imagen: "./img/camperas/CAMPERA-RUN.webp",
        categoria: {
            nombre: "Camperas",
            id: "camperas"
        },
        precio: 40000
    },
    //PANTALONES
    {
        id: "PANTALON-RUN-AIR",
        titulo: "PANTALON RUN-AIR",
        imagen: "./img/pantalones/PANTALON-RUN-AIR.webp",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 35000
    },
    {
        id: "PANTALÓN-RUNING-MICRO",
        titulo: "PANTALÓN RUNING-MICRO",
        imagen: "./img/pantalones/PANTALÓN-RUNING-MICRO.webp",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 35000
    },
    {
        id: "PANTALON-RUNING",
        titulo: "PANTALON RUNING",
        imagen: "./img/pantalones/PANTALON-RUNING.webp",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 28000
    },
    //REMERAS
    {
        id: "REMERA-CROSFIT",
        titulo: "REMERA CROSFIT",
        imagen: "./img/remeras/REMERA-CROSFIT.webp",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 25000
    },
    {
        id: "REMERA-DRIFITT",
        titulo: "REMERA DRIFITT",
        imagen: "./img/remeras/REMERA-DRIFITT.webp",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 25000
    },
    {
        id: "REMERA-RUN",
        titulo: "REMERA RUN",
        imagen: "./img/remeras/REMERA-RUN.webp",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio: 25000
    },
    //SHORES
    {
        id: "SHORT-ACTIVE-SPIRID",
        titulo: "SHORT ACTIVE SPIRID",
        imagen: "./img/shores/SHORT-ACTIVE-SPIRID.webp",
        categoria: {
            nombre: "Shores",
            id: "shores"
        },
        precio: 24000
    },
    {
        id: "SHORT-ICONX",
        titulo: "SHORT ICONX",
        imagen: "./img/shores/SHORT-ICONX.webp",
        categoria: {
            nombre: "Shores",
            id: "shores"
        },
        precio: 27000
    },
    {
        id: "SHORT-IMPORTADO",
        titulo: "SHORT IMPORTADO",
        imagen: "./img/shores/SHORT-IMPORTADO.webp",
        categoria: {
            nombre: "Shores",
            id: "shores"
        },
        precio: 28000
    },
    {
        id: "SHORT-RUNING-DE-DAMA",
        titulo: "SHORT RUNING DE DAMA",
        imagen: "./img/shores/SHORT-RUNING-DE-DAMA.webp",
        categoria: {
            nombre: "Shores",
            id: "shores"
        },
        precio: 23000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt='${producto.titulo}'>
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio }</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `
            contenedorProductos.append(div);
    });
    
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos"){
            const productosCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productosCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
})

//Boton de agregar al carrito

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actulizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actulizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actulizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}