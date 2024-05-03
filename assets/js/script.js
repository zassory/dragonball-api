// Function to fetch data from Digimon API
const fetchDragonBall = async() => {
    try {
        const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=50');
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching Digimon data:', error);
    }
}

const enviarData = (id , name , race , ki , description , image , maxKi , gender) => {
    const rutaArchivoHTML = '../personaje.html';
    
    // Realiza una solicitud para obtener el contenido del archivo HTML
    fetch(rutaArchivoHTML)
        .then(response => response.text())
        .then(html => {

            // Una vez que hayas obtenido el contenido del archivo HTML, puedes manipularlo
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

        // Modifica el contenido del archivo HTML como desees
        const imagePage = doc.getElementById('imagePage');
        imagePage.src = image;

        const namePage = doc.getElementById('name');
        namePage.textContent = name;

        const kiPage = doc.getElementById('ki');
        kiPage.textContent = `Ki : ${ki}`;

        const maxKiPage = doc.getElementById('maxKi');
        maxKiPage.textContent = `Ki Máximo : ${maxKi}`;

        const descPage = doc.getElementById('description');
        descPage.textContent = description;

     // Convierte el documento de nuevo a una cadena de texto HTML
     const nuevoHTML = new XMLSerializer().serializeToString(doc);

     // Finalmente, puedes usar el nuevo HTML como desees, por ejemplo, inyectándolo en tu página actual
     document.body.innerHTML = nuevoHTML;
   })
   .catch(error => {
     console.error('Error al cargar el archivo HTML:', error);
   });
}

// Function to create digimon cards
async function createDigimonCards() {
    const personajesData = await fetchDragonBall();
    const personajesRow = document.getElementById('personajesRow');

    personajesData.map((personaje) => {
         const { id , name , race , ki , description , image , maxKi , gender } = personaje;

         const divRow = document.createElement('div');
         divRow.classList.add("col-xl-3");
         divRow.classList.add("col-lg-3");
         divRow.classList.add("col-md-3");
         divRow.classList.add("col-sm-12");
         divRow.classList.add("col-xs-12");

         const card = document.createElement('div');
         card.classList.add('card');
         card.classList.add('mt-2');
         card.classList.add('mb-2');

         const imgCard = document.createElement('img');
         imgCard.classList.add('card-img-top');
         imgCard.classList.add('mt-2');
         imgCard.classList.add('mx-auto');
         imgCard.classList.add('w-75')
         imgCard.src = image;

         const divBody = document.createElement('div');
         divBody.classList.add('card-body');
         divBody.classList.add('text-center');
         divBody.classList.add('mx-auto');

         const tituloC = document.createElement('h5');
         tituloC.classList.add('card-title');
         tituloC.textContent = name;

         const levelC = document.createElement('p');
         levelC.classList.add('card-text');
         levelC.textContent = ki;

         const btnVer = document.createElement('button');
         btnVer.classList.add('btn');
         btnVer.classList.add('btn-primary');
         btnVer.classList.add('text-center');
         btnVer.classList.add('mx-auto');
         btnVer.textContent = 'Ver detalles';
         btnVer.addEventListener("click", enviarData.bind(null,id , name , race , ki , description , image , maxKi , gender));

         divRow.appendChild(card);
         card.appendChild(imgCard);
         card.appendChild(divBody);

         divBody.appendChild(tituloC);
         divBody.appendChild(levelC);
         divBody.appendChild(btnVer);

         personajesRow.appendChild(divRow);
     });
}



// Call function to create digimon cards when the page loads
window.onload = createDigimonCards;