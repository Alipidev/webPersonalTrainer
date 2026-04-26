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




    