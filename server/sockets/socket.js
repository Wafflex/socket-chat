const { io } = require('../server');

const { Users } = require('../classes/users');

const {crearMensaje} =  require('../utilidades/utilidades');

const users = new Users();


io.on('connection', (client) => {

    client.on('entrarChat',(user,callback)=>{

        if (!user.nombre || !user.sala){
            return callback({
                error:true,
                mensaje:'El nombre y sala son necesarios'
            })
        }

        client.join(user.sala);

        users.addPerson(client.id,user.nombre,user.sala);

        client.broadcast.to(user.sala).emit('listaPersona', users.getPersonsPerRoom(user.sala) );

        callback(users.getPersonsPerRoom(user.sala));
    })


    client.on('crearMensaje', (data)=>{
        console.log(data);
        let persona = users.getPerson(client.id);
        console.log(persona);
        let mensaje = crearMensaje(persona.name,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
    });

    client.on('disconnect', ()=>{
        let deletedPerson = users.deletePerson(client.id);
        
        client.broadcast.to(deletedPerson.sala).emit('crearMensaje',crearMensaje('Administrador',`${deletedPerson.name} abandonó el chat`));
        client.broadcast.to(deletedPerson.sala).emit('listaPersona', users.getPersonsPerRoom(deletedPerson.sala) );

    })

    client.on('mensajePrivado', data =>{
        let persona = users.getPerson(client.id);
        console.log(persona);
        console.log(data);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAA')
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.name,data.mensaje));
    });

});