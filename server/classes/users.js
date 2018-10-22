
class Users{

    constructor(){
        this.persons = [];
    }

    addPerson(id,name,sala){
        let person = {
            id,
            name,
            sala
        }
        this.persons.push(person);

        return this.persons;
    }

    getPerson(id){
        let person = this.persons.filter(person =>{
            return person.id === id;
        })[0];

        return person;
    }

    getPersons(){
        return this.persons;
    }

    getPersonsPerRoom(room){
        let personsPerRoom = this.persons.filter(person =>person.sala === room);
        return personsPerRoom;
    }

    deletePerson(id){

        let deletedPerson = this.getPerson(id);

        this.persons = this.persons.filter(person =>{
            return person.id != id
        });

        return deletedPerson;
    }
}

module.exports ={
    Users
}