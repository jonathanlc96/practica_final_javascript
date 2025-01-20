const sectionPlantas = document.querySelector('#plantas .grid');


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
    span.textContent = `Precio: ${planta.precio} €`;

    const btn = document.createElement('button');
    btn.textContent = 'Agregar al carrito';
    p.appendChild(span);
    article.append(figure, h3, p, btn)

    dom.appendChild(article)

}



function printAllPlants(list, dom) {
    list.forEach(planta => printOnePlant(planta, dom))
}
printAllPlants(plantas, sectionPlantas);