import {     
    loadInitialCharacters , 
    loadMoreCharacters } from "./operaciones.js";

let isLoading = false;



window.onload = loadInitialCharacters;

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
        loadMoreCharacters();
    }
});