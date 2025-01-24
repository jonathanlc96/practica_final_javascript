
let paginaActual = 1;
const itemsPorPagina = 9;//depende del media query y las columnas del grid
const sectionPlantas = document.querySelector('#plantas .grid');
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");

// Función para pintar una planta
function pintarUnaPlanta(planta, dom) {
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure'); // <figure></figure>
    const img = document.createElement('img'); // <img>
    img.src = planta.imagen;
    img.alt = planta.nombre;
    figure.appendChild(img);

    const h3 = document.createElement('h3'); // <h3></h3>
    h3.textContent = planta.nombre;

    const p = document.createElement('p');
    p.textContent = planta.descripcion;
    const span = document.createElement('span');
    span.textContent = `Precio: ${planta.precio} €`;
    span.classList.add('d-block', 'text-center', 'mt-3');

    const btn = document.createElement('button');
    btn.textContent = 'Agregar al carrito';
    btn.addEventListener('click', agregarAlCarrito);
    btn.dataset.nombre = planta.nombre; //dataset para guardar datos en el boton y pasarlos a la funcion agregarAlCarrito de funcionesCarrito.js
    btn.dataset.precio = planta.precio;
    btn.dataset.stock = planta.stock;
    btn.dataset.id = planta.id;
    btn.classList.add('btn', 'btn-primary', 'btn-md', 'bg-success', 'addCarrito');
    p.appendChild(span);
    article.append(figure, h3, p, btn);

    dom.appendChild(article);
}

// Función para pintar todas las plantas de una página
function pintarTodasPlantas(list, dom) {
    dom.innerHTML = ""; // Limpiar contenido previo
    list.forEach(planta => pintarUnaPlanta(planta, dom));
}

// Función para renderizar las plantas según la página actual
function renderizarPlantasPorPagina(pagina) {
    const inicio = (pagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const plantasPagina = plantas.slice(inicio, fin);

    pintarTodasPlantas(plantasPagina, sectionPlantas);
    actualizarBotones();
}
function paginasTotales() {
    return Math.ceil(plantas.length / itemsPorPagina)
}
// Función para actualizar los botones dependiendo si estas en la primera página o si estas en la última
function actualizarBotones() {

    if (paginaActual === 1) {
        btnAnterior.disabled = true

    } else {
        btnAnterior.disabled = false;
    }

    if (paginaActual === paginasTotales()) {
        btnSiguiente.disabled = true
    } else {
        btnSiguiente.disabled = false;
    }
}

// Event listeners para los botones

btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        renderizarPlantasPorPagina(paginaActual);
    }
});

btnSiguiente.addEventListener("click", () => {
    if (paginaActual < Math.ceil(plantas.length / itemsPorPagina)) {
        paginaActual++;
        renderizarPlantasPorPagina(paginaActual);
    }
});

// Inicialización
renderizarPlantasPorPagina(paginaActual);
