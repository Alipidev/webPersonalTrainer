<<<<<<< HEAD
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

=======
// Constante para detectar si estamos en una subcarpeta
const base = window.location.pathname.includes('/views/') ? '../' : '';
// Detectar si estamos en GitHubPages y que estraiga el nombre del repositorio automáticamente
// Si estamos en local usa una cadena vacía
const isGitHubPages = window.location.hostname.includes('github.io');
const repoBase = isGitHubPages ? '/' + window.location.pathname.split('/')[1] : '';

// Función para que cargue el header y el footer en todas las páginas html
function cargarComponente(archivo,idDestino,callback){
    fetch(base + archivo)
        .then(function(respuesta){
            return respuesta.text();
        })
        .then(function(html){
            document.getElementById(idDestino).innerHTML = html;

            //Ejecuta la función callback después de insertar el componente
            if(callback) callback();
        });
}

// Función para marcar el link activo según la página actual
function activarLinkActivo(){
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    console.log("Archivo actual:", currentFile);

    document.querySelectorAll("nav a").forEach(link =>{
        const linkFile = link.pathname.split('/').pop();
        console.log("link archivo:", linkFile, "| coincide:", linkFile === currentFile);

        if(linkFile===currentFile){
            link.classList.add("active");
        }
    });
    
}

// Función para el menú hamburguesa
function iniciarHamburguesa(){
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const navbar = document.querySelector('.navbar');

    // Cuando el usuario pulsa el botón
    btnHamburguesa.addEventListener('click', function(){
        // Añade o quita la clase abierto al botón y navbar
        // Si está abierto lo cierra, si está cerrado lo abre
        btnHamburguesa.classList.toggle('abierto');
        navbar.classList.toggle('abierto');
    });

    // Cierra el menú cuando el usuario pulsa un link
    document.querySelectorAll('.navbar a').forEach(function(link){
        link.addEventListener('click', function(){
            btnHamburguesa.classList.remove('abierto');
            navbar.classList.remove('abierto');
        });
    });
}

function ajustarEnlaces(){
    document.querySelectorAll('a[data-href]').forEach(function(link){
        link.href = repoBase + link.getAttribute('data-href');
    })
}

// Llamamos a la función después de cargar el header
cargarComponente('components/header.html', 'mi-header', function(){
    ajustarEnlaces();
    activarLinkActivo();
    iniciarHamburguesa();
})


// LLamamos a la función del footer
cargarComponente('components/footer.html', 'mi-footer');

fetch(base + 'data/noticias.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(noticias) {
        let seccion = document.getElementById('noticias-json');

        // 1. Creamos el div grid ANTES del forEach
        let grid = document.createElement('div');
        grid.className = 'grid-noticias';

        noticias.forEach(function(noticia) {
            let article = document.createElement('article');
            article.className = 'card-noticia';  

            article.innerHTML = `
                <h3>${noticia.tipo}</h3>
                <h4>${noticia.titulo}</h4>
                <p>${noticia.descripcion}</p>`;  

            grid.appendChild(article);   // añade al grid, no a la sección
        });

        seccion.appendChild(grid);       // al final, el grid entero a la sección
    });




    
>>>>>>> 70d8169ad5f5acf8b038347f8f501cc3585eb8c9
