'use strict';

function Persona(nombre) {
    this.nombre = nombre;
    // this.saluda = function() {
    //     console.log("Hola!! soy ", this.nombre);
    // }
}

Persona.prototype.saluda = function() {
    console.log("Hola!! soy ", this.nombre);
}

const pepe = new Persona('Pepe');
console.log(pepe);
pepe.saluda();

const maria = new Persona('Maria');
console.log(maria);
maria.saluda();