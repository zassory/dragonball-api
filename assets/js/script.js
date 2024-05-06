import {     
    loadInitialCharacters , 
    loadMoreCharacters ,
    loadOneCharacter,
    getCharactersFetchByName ,
} from "./operaciones.js";

let isLoading = false;

let nombre = "";

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click" , (e) => {
    nombre = document.getElementById("nombre").value;
    e.preventDefault();
    getCharactersFetchByName(nombre)
        .then((personaje) => {            
            loadOneCharacter(personaje);
        })
        .catch((error)=> {
            console.log(`El error es: ${error}`);
        })
});

// let nombre = document.getElementById("nombre");
// nombre.addEventListener("input", (e) => {
//     e.preventDefault();
//     getCharactersFetchByName(nombre.value)
//         .then((personaje)=> {
//             loadOneCharacter(personaje);
//         })
//         .catch((error)=> {
//             console.log(`El error es: ${error}`);
//         })
// })



window.onload = loadInitialCharacters;

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
        loadMoreCharacters();
    }
});