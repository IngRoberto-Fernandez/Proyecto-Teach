document.addEventListener('DOMContentLoaded',() =>{
    //Variables -base de datos
    const baseDeDatos=[
        {
            id:1,
            nombre: 'Sombrero vueltiao, hecho a mano, 23 vueltas',
            precio: 250000,
            imagen: 'assets/img/feature_prod_01.jpg',
            categoria:'sombreros'
        },
        {
            id:2,
            nombre: 'Sombrero vueltiao 18',
            precio: 150000,
            imagen: 'assets/img/feature_prod_02.jpg',
            categoria:'sombreros'
        },
        {
            id:3,
            nombre: 'Sombrero voltiao tricolor',
            precio: 80000,
            imagen: 'assets/img/feature_prod_03.jpg',
             categoria:'sombreros'
        },
        {
            id:4,
            nombre: 'Mochilas wayuu azul',
            precio: 90000,
            imagen: 'assets/img/shop_04.jpg',
             categoria:'mochilas'
        },
        {
            id:5,
            nombre: 'Bolso en fique',
            precio: 155000,
            imagen: 'assets/img/shop_03.jpg',
             categoria:'bolsos'
        },
        {
            id:6,
            nombre: 'Hamaca',
            precio: 200000,
            imagen: 'assets/img/category_img_02.jpg',
             categoria:'hamacas'
        }
    ];
    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');


//seccion de funciones 
/*
Dibujamos todos los productos a partir de la base de datos
*/
function renderizarProductos(){
baseDeDatos.forEach((info) =>{
    //estructura
    const miNodo = document.createElement('div');
    miNodo.classList.add('card','col-sm-4');
    //body
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');
    //titulo
    const miNodoTitle = document.createElement('h6');
    miNodoTitle.classList.add('card-tilte');
    miNodoTitle.textContent =info.nombre;
    //imagen
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('img-fluid');
    miNodoImagen.setAttribute('src',info.imagen);
    //precio
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent =  `${divisa}${info.precio}`;
    // Boton
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    miNodoBoton.textContent = 'Agregar';
    miNodoBoton.setAttribute('marcador', info.id);
    miNodoBoton.addEventListener('click', anadirProductoAlCarrito);

    //insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
});
}
/**
* Evento para añadir un producto al carrito de la compra
*/
function anadirProductoAlCarrito(evento) {
// Anyadimos el Nodo a nuestro carrito
carrito.push(evento.target.getAttribute('marcador'))
// Actualizamos el carrito
renderizarCarrito();
actualizarTotal();


handleCarritoValue(carrito.length)

}
function handleCarritoValue(value) {
const carritoContainer = document.getElementById("carrito-value");
carritoContainer.textContent =  `${value}`
}

function calcularTotal() {
return carrito.reduce((total, itemId) => {
const miItem = baseDeDatos.filter((itemBaseDatos) => {
    return itemBaseDatos.id === parseInt(itemId);
});
return total + miItem[0].precio;
}, 0);
}

// Función para actualizar el total en el DOM
function actualizarTotal() {
DOMtotal.textContent = calcularTotal();
}

//dibujar todos los productos guardados en el carrito
function renderizarCarrito() {
// Vaciamos todo el html
DOMcarrito.textContent = '';
// Quitamos los duplicados
const carritoSinDuplicados = [...new Set(carrito)];
// Generamos los Nodos a partir de carrito
carritoSinDuplicados.forEach((item) => {
  // Obtenemos el item que necesitamos de la variable base de datos
  const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
  });
  // Cuenta el número de veces que se repite el producto
  const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? total += 1 : total;
  }, 0);
  // Creamos el nodo del item del carrito
  const miNodo = document.createElement('li');
  miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
  miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
  // Boton de borrar
  const miBoton = document.createElement('button');
  miBoton.classList.add('btn', 'btn-danger', 'mx-5');
  miBoton.textContent = 'X';
  miBoton.style.marginLeft = '1rem';
  miBoton.dataset.item = item;
  miBoton.addEventListener('click', borrarItemCarrito);
  // Mezclamos nodos
  miNodo.appendChild(miBoton);
  DOMcarrito.appendChild(miNodo);
});
actualizarTotal();

}
/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
// Obtenemos el producto ID que hay en el boton pulsado
const id = evento.target.dataset.item;
// Borramos todos los productos
carrito = carrito.filter((carritoId) => {
  return carritoId !== id;
});
// volvemos a renderizar
renderizarCarrito();
// Actualizamos el LocalStorage
guardarCarritoEnLocalStorage();

handleCarritoValue(carrito.length)
actualizarTotal(); // Actualizar el total al borrar item
}

// Evento para vaciar carrito
DOMbotonVaciar.addEventListener('click', () => {
carrito = [];
renderizarCarrito();
handleCarritoValue(0);
actualizarTotal(); // Actualizar el total al vaciar carrito
});
renderizarProductos();
renderizarCarrito();
});