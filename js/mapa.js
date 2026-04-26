// Coordenadas del negocio
const latNegocio = 39.4699;
const lngNegocio = -0.3763;

// Inicializamos el mapa
const mapa = L.map('mapa').setView([latNegocio, lngNegocio], 15);

// Capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Marcador del negocio
L.marker([latNegocio, lngNegocio])
    .addTo(mapa)
    .bindPopup(`
        <strong>Personal Trainer Alina</strong><br>
        Calle Ejemplo 123, Valencia
    `)
    .openPopup();

// Capturamos el botón
const btnRuta = document.getElementById('btn-ruta');

// Cuando el usuario pulsa el botón
btnRuta.addEventListener('click', function(){

    // Cambiamos el texto del botón para indicar que está cargando
    btnRuta.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculando...';
    btnRuta.disabled = true;    // desactivamos el botón para que no se pulse dos veces

    // Pedimos la ubicación al usuario
    navigator.geolocation.getCurrentPosition(

        // Si acepta
        function(posicion){
            const latCliente = posicion.coords.latitude;
            const lngCliente = posicion.coords.longitude;

            // Marcador del cliente
            L.marker([latCliente, lngCliente])
                .addTo(mapa)
                .bindPopup('Tu ubicación')
                .openPopup();

            // Calculamos la ruta
            L.Routing.control({
                waypoints: [
                    L.latLng(latCliente, lngCliente),   // inicio: cliente
                    L.latLng(latNegocio, lngNegocio)    // destino: negocio
                ],
                language: 'es',
                routeWhileDragging: false,
                show: false     // ocultamos el panel de instrucciones
            }).addTo(mapa);

            // Actualizamos el botón
            btnRuta.innerHTML = '<i class="fa-solid fa-check"></i> Ruta calculada';
        },

        // Si rechaza
        function(error){
            btnRuta.innerHTML = '<i class="fa-solid fa-route"></i> Cómo llegar';
            btnRuta.disabled = false;   // reactivamos el botón
            alert('Necesitamos tu ubicación para calcular la ruta');
        }
    );
});