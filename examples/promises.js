
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