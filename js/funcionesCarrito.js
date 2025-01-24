let carrito = [];
const bodyOfCanvas = document.querySelector('.ofcanvas-body');
const ulCarrito = document.querySelector('#listaAdd');
const btnPagar = document.querySelector('#btnPagar');

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const producto = plantas.find(plant => plant.id === Number(event.target.dataset.id));

    if (!producto) {
        alert('Producto no encontrado.');
        return;
    }

    // Verificar si hay stock disponible
    if (producto.stock <= 0) {
        alert(`No queda stock de ${producto.nombre}`);
        return;
    }

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        // Si ya existe, verificar si aún hay stock para aumentar la cantidad
        if (producto.stock > 0) {
            productoEnCarrito.cantidad += 1;
            producto.stock -= 1;
        } else {
            alert(`No queda suficiente stock de ${producto.nombre}`);
        }
    } else {
        // Si no existe, agregarlo con cantidad inicial de 1
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        producto.stock -= 1; // Reducir el stock
    }

    // Actualizar la vista del carrito
    pintarCarrito();
}

// Función para pintar el carrito
function pintarCarrito() {
    // Limpiar el contenido del offcanvas
    ulCarrito.textContent = '';

    // Recorrer el carrito y crear elementos dinámicamente
    carrito.forEach(producto => {
        const li = document.createElement('li');
        const divBotones = document.createElement('div');
        divBotones.classList.add('botonesCarrito');

        li.classList.add('itemCarrito')
        li.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}€ x ${producto.cantidad} `;

        // Botón para aumentar la cantidad
        const btnIncrementar = crearBoton('+', () => incrementar(producto));
        // Botón para disminuir la cantidad
        const btnDecrementar = crearBoton('-', () => decrementar(producto));
        // Botón para eliminar el producto del carrito
        const btnEliminar = crearBoton('Eliminar', () => eliminar(producto));
        btnEliminar.classList.add('btnEliminar');

        // Agregar botones al li
        li.appendChild(divBotones)
        li.appendChild(btnIncrementar);
        li.appendChild(btnDecrementar);
        li.appendChild(btnEliminar);

        // Agregar el li al offcanvas
        ulCarrito.appendChild(li);
    });

    // Calcular y mostrar el total
    const total = calcularTotal();
    const totalElement = document.createElement('h4');
    totalElement.textContent = `Total: ${total.toFixed(2)}€ `;
    totalElement.classList = 'totalCarrito';

    ulCarrito.appendChild(totalElement);
    btnPagar.addEventListener('click', mensajePago);
    btnPagar.dataset.totalCompra = total;
}

// Crear botón con evento
function crearBoton(texto, callback) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.classList.add('botones', 'btn', 'border-black');
    boton.addEventListener('click', callback);
    return boton;
}

// Incrementar la cantidad de un producto en el carrito
function incrementar(producto) {
    const productoStock = plantas.find(p => p.id === producto.id);

    if (productoStock && productoStock.stock > 0) {
        producto.cantidad += 1;
        productoStock.stock -= 1;
    } else {
        alert(`No queda suficiente stock de ${producto.nombre}`);
    }

    pintarCarrito();
}

// Decrementar la cantidad de un producto en el carrito
function decrementar(producto) {
    const productoStock = plantas.find(p => p.id === producto.id);

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        productoStock.stock += 1; // Devolver una unidad al stock
    } else {
        // Si la cantidad es 1, eliminar del carrito y devolver todo al stock
        carrito = carrito.filter(item => item.id !== producto.id);
        productoStock.stock += 1;
    }

    pintarCarrito();
}

// Eliminar un producto del carrito y devolver todo su stock
function eliminar(producto) {
    const productoStock = plantas.find(p => p.id === producto.id);

    if (productoStock) {
        productoStock.stock += producto.cantidad; // Devolver todo al stock
    }

    // Eliminar del carrito
    carrito = carrito.filter(item => item.id !== producto.id);

    pintarCarrito();
}

// Calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
}

//Mensaje al hacer el pago
function mensajePago(event) {
    if (ulCarrito.textContent !== "") {
        let compra = parseFloat(event.target.dataset.totalCompra);
        alert(`Gracias por comprar en nuestra tienda, el total de la compra es: ${compra.toFixed(2)}€`);
        ulCarrito.textContent = '';
        carrito = [];
    } else {
        alert('No hay productos en el carrito');
    }
}
