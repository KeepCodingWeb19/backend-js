
const saluda = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('Hola Mundo!');
        resolve('Hola Mundo!');
    }, 1000);
});

saluda.then(res => {
    console.log(res);
})
.catch(err => {
    console.error('Fatal Error', err);
});

// TODO: Crea una promesa de azar con un 20% de posibilidades de fallar
// y devolver el valor en 2 segundos
const azar = new Promise((res, rej) => {
    setTimeout(() => {
        const rnd = Math.random();
        if (rnd <= 0.2) {
            rej(`Azar falló con: ${rnd.toFixed(2)}`);
        } else {
            res(`Azar OK con: ${rnd.toFixed(2)}`);
        }
    }, 2000);
});

azar.then(res => {
    console.log(res);
})
.catch(err => {
    console.error(err);
});

function paso1() {
    return new Promise((res, rej) => {
        res('Paso 1 resuelto');
    });
};

function paso2() {
    return Promise.resolve('Paso 2 resuelto');
};

function paso3() {
    return Promise.reject('Paso 3 fallo');
};

paso1()
    .then(res => {
        console.log(res);
        return paso2();
    })
    .then(res => {
        console.log(res);
        return paso3();
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error('Fatal error: ', err);
    })
    .finally(() => {
        console.log('Flujo finalizado');
    });