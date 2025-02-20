let carrito = [];
const listaCarrito = document.getElementById("listaCarrito");
const contadorCarritoMobile = document.getElementById("contadorCarritoMobile");
const contadorCarritoDesktop = document.getElementById("contadorCarritoDesktop");
const totalCarrito = document.getElementById("totalCarrito");

// Función para actualizar el carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = ""; // Limpiar la lista antes de actualizarla
    let total = 0;

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        // Si el carrito está vacío, mostrar un mensaje
        listaCarrito.innerHTML = "<li class='list-group-item'>Tu carrito está vacío</li>";
    } else {
        // Recorrer todos los productos en el carrito y agregarlos a la lista
        carrito.forEach((producto, index) => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = ` 
                ${producto.nombre} - $${producto.precio.toFixed(2)} 
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">X</button>
            `;
            listaCarrito.appendChild(li);
            total += producto.precio;
        });
    }

    // Actualizar los contadores en ambas interfaces (móvil y desktop)
    contadorCarritoMobile.textContent = carrito.length;  // Actualizar el contador para móvil
    contadorCarritoDesktop.textContent = carrito.length; // Actualizar el contador para desktop
    totalCarrito.textContent = total.toFixed(2);

    // Guardar el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    // Obtener el nombre y precio del producto
    const nombre = document.getElementById("nombreProducto").textContent; // Obtener nombre del producto
    const precioTexto = document.getElementById("precioProducto").textContent; // Obtener precio como texto

    // Limpiar el precio para obtener el valor numérico correcto
    const precio = parseFloat(precioTexto.replace(/[^0-9.-]+/g, "")); // Eliminar todo lo que no sea número o punto

    // Verificar que el precio se limpió y convirtió correctamente
    if (isNaN(precio)) {
        console.error("El precio extraído no es válido:", precioTexto);
        return;
    }

    // Agregar el producto al carrito
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Asociar el evento del botón de agregar al carrito
document.addEventListener("DOMContentLoaded", () => {
    // Recuperar el carrito guardado en localStorage (si existe)
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado; // Cargar los productos del carrito guardado
        actualizarCarrito(); // Actualizar el carrito en la interfaz
    }

    // Asociar el evento del botón de agregar al carrito
    document.getElementById("agregarAlCarrito").addEventListener("click", agregarAlCarrito);
});
