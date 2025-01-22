let carrito = [];
const bodyOfCanvas = document.querySelector('.ofcanvas-body');
const ulCarrito = document.querySelector('#listaAdd');
const btnPagar = document.querySelector('#btnPagar');

function agregarAlCarrito(event) {
    const producto = plantas.find(plant => plant.id === Number(event.target.dataset.id));
    const stock = event.target.dataset.stock;

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === Number(event.target.dataset.id));

    if (productoEnCarrito) {
        // Si ya existe, solo aumentar la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si no existe, agregarlo con cantidad inicial de 1
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    // Actualizar la vista del carrito
    pintarCarrito();
}

function mensajePago(event) {
    if (ulCarrito.textContent !== '') {
        let compra = parseFloat(event.target.dataset.totalCompra);
        alert(`Gracias por comprar en nuestra tienda, el total de la compra es: ${compra.toFixed(2)}€`);
        ulCarrito.innerHTML = '';

    } else {
        alert('No hay productos en el carrito');
    }

}
function pintarCarrito() {
    // Limpiar el contenido del offcanvas
    ulCarrito.innerHTML = '';

    // Recorrer el carrito y crear elementos dinámicamente
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}€ x ${producto.cantidad} `; //uso toFixed para tener 2 decimales

        // Botón para aumentar la cantidad
        const btnIncrementar = document.createElement('button');
        btnIncrementar.textContent = '+';
        btnIncrementar.addEventListener('click', () => {
            producto.cantidad += 1;
            pintarCarrito();
        });

        // Botón para disminuir la cantidad
        const btnDecrementar = document.createElement('button');
        btnDecrementar.textContent = '-';
        btnDecrementar.addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad -= 1;
            } else {
                // Si la cantidad es 1, eliminar el producto
                carrito = carrito.filter(item => item.id !== producto.id);
            }
            pintarCarrito();
        });

        // Botón para eliminar el producto del carrito
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            carrito = carrito.filter(item => item.id !== producto.id);
            pintarCarrito();
        });

        // Agregar botones al li
        li.appendChild(btnIncrementar);
        li.appendChild(btnDecrementar);
        li.appendChild(btnEliminar);

        // Agregar el li al offcanvas
        ulCarrito.appendChild(li);
    });

    // Calcular y mostrar el total
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    const totalElement = document.createElement('h4');
    totalElement.textContent = `Total: ${total.toFixed(2)}€ `;
    totalElement.classList = 'totalCarrito';

    ulCarrito.appendChild(totalElement);
    btnPagar.addEventListener('click', mensajePago);
    btnPagar.dataset.totalCompra = total;
}

