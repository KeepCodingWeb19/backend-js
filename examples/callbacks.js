'use strict';

function suma(a, b, callback) {
    const resultado = a + b;
    callback(resultado);
    return resultado;
};

const resultado = suma(2, 5, function(res) {
    console.log("Resultado: ", res);
});

// Cuando se ejecute suma, pinta el resultado por consola;

console.log(resultado);