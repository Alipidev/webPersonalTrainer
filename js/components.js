// Fetch de noticias solo en el index
const seccionNoticias = document.getElementById('noticias-json');
if(seccionNoticias) {
    fetch('data/noticias.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(noticias) {
            let grid = document.createElement('div');
            grid.className = 'grid-noticias';

            noticias.forEach(function(noticia) {
                // Creamos un article por cada noticia
                let article = document.createElement('article');
                article.className = 'card-noticia';
                // Rellenamos el HTML de cada tarjeta con los datos del JSON
                article.innerHTML = `
                    <span class="tag tag-${noticia.tag}">${noticia.tipo}</span>
                    <h4>${noticia.titulo}</h4>
                    <p>${noticia.descripcion}</p>
                    <span class="noticia-fecha">${noticia.fecha}</span>
                    <button class="btn-leer-mas">Leer m&aacute;s <i class="fa-solid fa-arrow-right"></i></button>`;
                    // Añadimos la tarjeta al grid
                grid.appendChild(article);
                // Evento click en cada tarjeta abre el modal
                article.addEventListener('click', function(){
                    // Obtenemos los elementos del modal
                    const overlay = document.getElementById('modal-overlay');
                    const modalTag = document.getElementById('modal-tag');
                    const modalTitulo = document.getElementById('modal-titulo');
                    const modalFecha = document.getElementById('modal-fecha');
                    const modalContenido = document.getElementById('modal-contenido');
                    // Rellenamos el modal con los datos de la noticia clickada
                    modalTag.textContent = noticia.tipo;
                    modalTag.className = `tag tag-${noticia.tag}`;
                    modalTitulo.textContent = noticia.titulo;
                    modalFecha.textContent = noticia.fecha;
                    // Creamos una lista ordenda del contenido
                    const lista = noticia.contenido.map(function(paso, index){
                        return `<li>${paso}</li>`;
                    }).join('');
                    modalContenido.innerHTML = `<ol>${lista}</ol>`
                    // Añadimos la clase activo para mostrar el modal
                    overlay.classList.add('activo');
                });
            });
            // Añadimos el grid completo a la sección de noticias
            seccionNoticias.appendChild(grid);

            
        });
}
// Cerrar modal
const overlay = document.getElementById('modal-overlay');
const btnCerrar = document.getElementById('modal-cerrar');
//Cerramos el modal al pulsar el botón X
if(btnCerrar){
    btnCerrar.addEventListener('click', function(){
        overlay.classList.remove('activo');
    });
}

//Cerramos el modal al pulsar fuera de el
if(overlay){
    overlay.addEventListener('click', function(e){
        if(e.target === overlay){
            overlay.classList.remove('activo');
        }
    });
}


// Menú hamburguesa
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const navbar = document.querySelector('.navbar');

btnHamburguesa.addEventListener('click', function(){
    btnHamburguesa.classList.toggle('abierto');
    navbar.classList.toggle('abierto');
});

document.querySelectorAll('.navbar a').forEach(function(link){
    link.addEventListener('click', function(){
        btnHamburguesa.classList.remove('abierto');
        navbar.classList.remove('abierto');
    });
});

