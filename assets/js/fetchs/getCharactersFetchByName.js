export const getCharactersFetchByName = async(name) => {
    try{

        const response = await fetch(`https://dragonball-api.com/api/characters?name=${name}`);
        const data = await response.json();
        return data;

    }catch(error){
        console.log(`Error al obtener los personajes: ${error}`);
        return [];//Retorno un array vacio.
    }
}