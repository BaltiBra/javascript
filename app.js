// const stockProductos = [
//   {
//       id: 1,
//       nombre: "Manga Ninjen Shikkaku",
//       tipo: "mangas",
//       descripcion: "Manga NS tomo 1",
//       precio: 1000,
//       img: './img/1.jpg',
//       cantidad:1
//   },

//   {
//       id: 2,
//       nombre: "Manga Dragon Ball Z",
//       tipo: "mangas",
//       descripcion: "El manga mas conocido",
//       precio: 1200,
//       img: './img/7.jpg',
//       cantidad:1
//   },

//   {
//       id: 3,
//       nombre: "Manga Vampeerz",
//       tipo: "mangas",
//       descripcion: "Vampeerz toma 1 al 2",
//       precio: 1100,
//       img: './img/8.jpg',
//       cantidad:1
//   },

//   {
//       id: 4,
//       nombre: "Manga Shuumatsu no valkyrie",
//       tipo: "mangas",
//       descripcion: "Tomo 1 al 14",
//       precio: 1200,
//       img: './img/9.jpg',
//       cantidad:1
//   },

//   {
//       id: 5,
//       nombre: "Ranking Kings",
//       tipo: "mangas",
//       descripcion: "Tomo 1 al 3",
//       precio: 1200,
//       img: './img/10.jpg',
//       cantidad:1
//   },

//   {
//       id: 6,
//       nombre: "Remera de la seleccion",
//       tipo: "remera",
//       descripcion: "La remera de messi paa",
//       precio: 5000,
//       img: './img/seleccion2.jpg',
//       cantidad:1
//   },

//   {
//       id: 7,
//       nombre: "Remera del manga Spy X Family",
//       tipo: "remera",
//       descripcion: "Remera edicion especial de Spy",
//       precio: 5500,
//       img: './img/spyxf1.jpg',
//       cantidad:1
//   },

//   {
//       id: 8,
//       nombre: "Aritos",
//       tipo: "Merchandaising",
//       descripcion: "Aritos de diferentes mangas",
//       precio: 1000,
//       img: './img/aritos.jpg',
//       cantidad:1
//   },

//   {
//       id: 9,
//       nombre: "Figuras",
//       tipo: "Merchandaising",
//       descripcion: "Figuras de anime y comics",
//       precio: 3500,
//       img: './img/figuras.jpg',
//       cantidad:1
//   },

//   {
//       id: 10,
//       nombre: "Gorras",
//       tipo: "Merchandaising",
//       descripcion: "Gorras baratas",
//       precio: 1500,
//       img: './img/gorras.jpg',
//       cantidad:1
//   },

//   {
//       id: 11,
//       nombre: "Llaveros",
//       tipo: "Merchandaising",
//       descripcion: "Llaveros animes y ediciones coleccionistas",
//       precio: 1300,
//       img: './img/llavero.jpg',
//       cantidad:1
//   },

//   {
//       id: 12,
//       nombre: "Funko pop",
//       tipo: "Merchandaising",
//       descripcion: "Funko Pop solamente de animes",
//       precio: 3400,
//       img: './img/madara.jpg',
//       cantidad:1
//   },

//   ,
// ];


let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago');




if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});

if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

// fetch('/stock.json')
//   .then(resp => resp.json())
//   .then(stockProductos => {
//     stockProductos.forEach ((prod) => {
//       const { id, nombre, precio, descripcion, img, cantidad } = prod;
//       if (contenedor) {
//         contenedor.innerHTML += 
        
//         `                     <div class="item-container">
//                               <div class="main-item">
//                                   <img src=${img}>
//                               </div>
//                               <h2 class="item-heading">
//                                   ${nombre}
//                               </h2>
//                               <p class="item-description">
//                                     ${descripcion}
//                                     Cantidad: ${cantidad}
//                               </p>
//                               <p class="item-price">$${precio}</p>
//                               <a class="footer-anchor" ><button class="item-cart-btn agregar" onclick="agregarProducto(${id})">Encarga! </button></a>
//                               </div>
                            
//                             `;
//       }
//     });
//   })


const obtenerStock = async () => {
    const resp = await fetch('/stock.json')
    const stockProductos = await resp.json()

    console.log(stockProductos)
}

obtenerStock()

// stockProductos.forEach ((prod) => {
//   const { id, nombre, precio, descripcion, img, cantidad } = prod;
//   if (contenedor) {
//     contenedor.innerHTML += 
    
//     `                     <div class="item-container">
//                           <div class="main-item">
//                               <img src=${img}>
//                           </div>
//                           <h2 class="item-heading">
//                               ${nombre}
//                           </h2>
//                           <p class="item-description">
//                                 ${descripcion}
//                                 Cantidad: ${cantidad}
//                           </p>
//                           <p class="item-price">$${precio}</p>
//                           <a class="footer-anchor" ><button class="item-cart-btn agregar" onclick="agregarProducto(${id})">Encarga! </button></a>
//                           </div>
                        
//                         `;
//   }
// });

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'service_adbnlqc';
   const templateID = 'template_tk9bilr';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }