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
        <strong>Personal Trainer</strong><br>
        Calle Ejemplo 123, Valencia
    `)
    .openPopup();

// Calculamos al ruta automáticamente al cargar la página
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
        },

        // Si rechaza
        function(error){
            // Si rechaza solo se muestra el mapa con el marcador del negocio
            console.log('El usuario no ha compartido su ubicación');
        }
    );
