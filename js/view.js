const sectionPlantas = document.querySelector('#plantas .grid');
//función para pintar en el offcanvas del carrito los productos añadidos cada vez que se pulse el boton de agregar carrito
const ulPlantasCarrito = document.querySelector('#listaAdd');
const hTotal = document.querySelector('#totalCarrito')



function removeProductCart(event) {
    event.target.parentNode.remove()
    //añadir 1 al dataset de stock cada vez que se elimine el producto del stock
}

function addProductCart(event) {
    const li = document.createElement('li');
    //añadir dataset de stock que cada vez que se añada un prod al carrito se reste 1 al stock y tambien se actualice del array; lo mismo al pulsar el boton de +. crear alerta cuando el stock llegue a 0
    li.textContent = `${event.target.dataset.nombre} - ${event.target.dataset.precio}€`;

    const btnDec = document.createElement('button');
    btnDec.textContent = '-';
    btnDec.addEventListener('click', disminuirProducto);
    const spanCantidadProd = document.createElement('span')
    spanCantidadProd.textContent = '1';
    spanCantidadProd.classList.add('cantProductos');


    const btnInc = document.createElement('button');
    btnInc.textContent = '+';
    btnInc.addEventListener('click', incrementarProducto);
    btnInc.dataset.cantidad = Number(spanCantidadProd.textContent);
    /*  btnInc.dataset.span = spanContador; */

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', removeProductCart)
    btnEliminar.classList.add('btn', 'btn-danger');
    const spanTotal = document.createElement('span');
    spanTotal.textContent = `${event.target.dataset.precio}€`;
    hTotal.appendChild(spanTotal);



    li.append(btnDec, spanCantidadProd, btnInc, btnEliminar);
    ulPlantasCarrito.appendChild(li);
    //updateTotal();

}


function incrementarProducto(event) {
    const spanCont = document.querySelector('.cantProductos');
    spanCont.textContent = `${event.target.dataset.cantidad++}`;
    console.log(spanCont.textContent);


}


function disminuirProducto(event) {
    const spanCont = document.querySelector('.cantProductos');
    let quantity = parseInt(spanCont.textContent)
    console.log(quantity--);
    /*    if (quantity > 1) {
           quantity--;
           spanCont.textContent = quantity;
           //updateTotal();
       } */
}




//Funciones para pintar en el html los datos de las plantas que llegan de data.js
function printOnePlant(planta, dom) {
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
    span.textContent = `Precio: ${planta.precio} €`
    span.classList.add('d-block', 'text-center', 'mt-3');

    const btn = document.createElement('button');
    btn.textContent = 'Agregar al carrito';
    btn.addEventListener('click', addProductCart);
    btn.dataset.nombre = planta.nombre;
    btn.dataset.precio = planta.precio;
    btn.dataset.stock = planta.stock;
    btn.classList.add('btn', 'btn-primary', 'btn-md', 'bg-success', 'addCarrito');
    p.appendChild(span);
    article.append(figure, h3, p, btn)

    dom.appendChild(article)

}

function printAllPlants(list, dom) {
    list.forEach(planta => printOnePlant(planta, dom))
}
printAllPlants(plantas, sectionPlantas);

