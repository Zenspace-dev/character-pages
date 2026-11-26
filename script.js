let page = 2;

// get DOM elements
const statusText = document.getElementById("status");
const results = document.getElementById("results");
const pageLabel = document.getElementById("pageLabel");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

async function LoadPage() {
    try {
        const url = `https://rickandmortyapi.com/api/character?page=`
        results.textContent = "";

        statusText.textContent = "Loading...";

        const response = await fetch(url);
        
        if(!response.ok) {
            statusText.textContent `Something went wrong (${response.status})`
            return;
        }

        const data = await response.json();
        console.log(data);

        statusText.textContent = "";

        showCards(data.results);


    } catch (error) {
        console.log(error);
        statusText.textContent = "Could not reach Rick and Morty API. Check internet";
    }
}
    function nextPage() {
        page = page + 1;
        LoadPage()
    }
    nextButton.addEventListener("click", nextPage);
    
    function prevPage() {
        page = page -1;
        LoadPage();
    }
    prevButton.addEventListener("click", prevPage);


    function showCards(characters) {
    characters.forEach(function (character){
        const column = document.createElement("div");
        column.className = "col-6 col-md-4 col-lg-3";

        const card = document.createElement("div");
        card.className = "card h-100 p-2";
        
        const picture = document.createElement("img");
        picture.src = character.image;
        picture.alt = character.name;
        picture.className = "img-fluid rounded mb-2";

        card.appendChild(picture);
        const name = document.createElement("p");
        name.className = "h6";
        name.textContent = character.name;

        card.appendChild(name);

        const info = document.createElement("p");
        info.className = "small mb-0";
        info.textContent = `${character.species} - ${character.status}`;

        card.appendChild(info);

        if(character.status === "Dead") {
            card.classList.add("dead");
         }

         column.appendChild(card);
         results.appendChild(column);

    })
}













LoadPage();
