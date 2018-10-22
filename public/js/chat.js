var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

//CONEXION
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario,(resp)=>{
        console.log('Usuarios conectados',resp);
    })
});

// DESCONEXION
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
    
});


// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// MOSTRAR MENSAJE AL CREARSE
socket.on('crearMensaje', (mensaje)=> {
    console.log(mensaje);
});

//MOSTRAR PERSONAS CONECTADAS / DESCONECTADAS
socket.on('listaPersona', function(personas) {
    console.log(personas);
});



socket.on('mensajePrivado',(mensaje)=>{
    console.log('Mensaje privado: ',mensaje);
});