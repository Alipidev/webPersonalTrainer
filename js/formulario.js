// Capturamos los campos y el formulario
// Guardamos cada campo en una variable
const form = document.getElementById('form-contacto');

const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');

// Variables del presupuesto
const producto = document.getElementById('producto');
const plazo = document.getElementById('plazo');
const unidadPlazo = document.getElementById('unidad-plazo');
const extras = document.querySelectorAll('input[name="extras"]');
const presupuestoTotal = document.getElementById('presupuesto-total');
const condiciones = document.getElementById('condiciones');

// Función para calcular el presupuesto
function calcularPresupuesto(){

    // Recogemos el precio del producto seleccionado
    const precioProducto = parseFloat(producto.value) || 0;

    // Recogemos el plazo introducido
    const valorPlazo = parseFloat(plazo.value) || 0;
    const unidad = unidadPlazo.value;

    // Sumamos los extras seleccionados
    let totalExtras = 0;
    extras.forEach(function(extra){
        if(extra.checked){
            totalExtras += parseFloat(extra.value);
        }
    });

    // Calculamos el total sin los descuentos
    let subtotalProducto = precioProducto * valorPlazo;

    // Aplicamos el descuento según unidad y plazo
    let descuento = 0;

    if(unidad === 'meses'){
        if(valorPlazo >= 12){
            descuento = 0.25;
        } else if(valorPlazo >= 6){
            descuento = 0.15;
        }
    }else if(unidad === 'dias'){
        if(valorPlazo >= 365){
            descuento = 0.10;
        } else if(valorPlazo >= 180){
            descuento = 0.05;
        }
    }
    // Aplicamos el descuento solo al producto, los extras se suman después
    subtotalProducto = subtotalProducto - (subtotalProducto * descuento);

    // Total final
    let total = subtotalProducto + totalExtras;

    // Mostramos el resultado en el campo del presupuesto
    presupuestoTotal.value = (Math.round(total * 100) / 100).toFixed(2) + '€';

}

//  Event listeners para calcular el presupuesto en tiempo real
producto.addEventListener('change', calcularPresupuesto);
plazo.addEventListener('input', calcularPresupuesto);
unidadPlazo.addEventListener('change', calcularPresupuesto);

extras.forEach(function(extra){
    extra.addEventListener('change', calcularPresupuesto);
});

// Vamos a realizar las funciones para validar cada campo

// Función para validar el nombre
function validarNombre(){
    const valor = nombre.value.trim();
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(valor === ''){
        mostrarError('error-nombre', 'El nombre es obligatorio');
        return false;
    }else if(!soloLetras.test(valor)){
        mostrarError('error-nombre', 'Solo se permiten letras');
        return false;
    } else if(valor.length>15){
        mostrarError('error-nombre', 'Máximo 15 carcateres')
        return false;
    } else{
        mostrarError('error-nombre','');
        return true;
    }
}

// Función para validar los apellidos
function validarApellidos(){
    const valor = apellidos.value.trim();
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(valor===''){
        mostrarError('error-apellidos', 'Los apellidos son obligatorios')
        return false;
    }else if(!soloLetras.test(valor)){
        mostrarError('error-apellidos', 'Solo se permiten letras')
        return false;
    }else if(valor.length>40){
        mostrarError('error-apellidos', 'Máximo 40 caracteres')
        return false;
    } else{
        mostrarError('error-apellidos', '');
        return true;
    }
}

// Función para validar el teléfono
function validarTelefono(){
    const valor = telefono.value.trim();
    const soloNumeros = /^[0-9]+$/; //solo numeros

    if(valor===''){
        mostrarError('error-telefono', 'El teléfono es obligatorio');
        return false;
    } else if(!soloNumeros.test(valor)){
        mostrarError('error-telefono', 'Solo se permiten números');
        return false;
    } else if(valor.length>9){
        mostrarError('error-telefono', 'Máximo 9 dígitos');
        return false;
    } else{
        mostrarError('error-telefono', '');
        return true;
    }
}

// Función para validar el email
function validarEmail(){
    const valor = email.value.trim();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(valor===''){
        mostrarError('error-email', 'El email es obligatorio');
        return false;
    } else if(!formatoEmail.test(valor)){
        mostrarError('error-email', 'Formato inválido. Ejemplo: nombre@email.com');
        return false;
    } else{
        mostrarError('error-email','');
        return true;
    }
}

// Función para validar el prodcucto
function validarProducto(){
    if(producto.value === ''){
        mostrarError('error-producto', 'Debes seleccionar un producto');
        return false;
    } else{
        mostrarError('error-producto', '');
        return true;
    }
}

// Función para validar el plazo
function validarPlazo(){
    const valor = parseFloat(plazo.value);

    if(!plazo.value){
        mostrarError('error-plazo', 'El plazo es obligatorio');
        return false;
    } else if(valor < 1){
        mostrarError('error-plazo', 'El plazo mínimo es 1');
        return false;
    } else {
        mostrarError('error-plazo', '');
        return true;
    }
}

// Función para validar las condiciones
function validarCondiciones(){
    if(!condiciones.checked){
        mostrarError('error-condiciones', 'Debes aceptar las condiciones de privacidad');
        return false;
    } else{
        mostrarError('error-condiciones', '');
        return true;
    }
}

// Función para mostrar los errores
function mostrarError(id, mensaje){
    document.getElementById(id).textContent = mensaje;
}

// Submit del formulario
form.addEventListener('submit', function(e){
    e.preventDefault(); //evita que la página se recargue

    const nombreOk = validarNombre();
    const apellidosOk = validarApellidos();
    const telefonoOk = validarTelefono();
    const emailOk = validarEmail();
    const productoOk = validarProducto();
    const plazoOk = validarPlazo();
    const condicionesOk = validarCondiciones();

    if(nombreOk && apellidosOk && telefonoOk && emailOk && productoOk && plazoOk && condicionesOk){
        alert('¡Formulario enviado correctamente!');
        form.reset(); //limpia el formularop
        presupuestoTotal.value = ''; //limpiamos el presupuesto manualmente
    }
});