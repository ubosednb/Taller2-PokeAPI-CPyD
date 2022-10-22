const container = document.querySelector(".container");
const spinner = document.querySelector("#spinner");
const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");

let offset = 1;
let limit = 9;

anterior.addEventListener('click', () => {
    if(offset != 1){
        offset = offset-10;
        /* removeChildNodes es para eliminar todas las card en los containers*/ 
        removeChildNodes(container);
        fetchContador(offset, limit);
    }
})

//AGREGAR IF CON LIMITE SI ES NECESARIO
siguiente.addEventListener('click', () => {
    offset = offset+10;
    removeChildNodes(container);
    fetchContador(offset, limit);
})

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
    });
}

function fetchContador(offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    // SPRITE
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);

    //ID
    const num = document.createElement('p');
    num.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    //NOMBRE
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    //ALTURA
    const height = document.createElement('p');
    name.classList.add('height');
    height.textContent = `Altura: ${pokemon.height.toString()}`;

    //PESO
    const weight = document.createElement('p');
    name.classList.add('weight');
    weight.textContent = `Peso: ${pokemon.weight.toString()}`;

    //CARD
    card.appendChild(spriteContainer);
    card.appendChild(num);
    card.appendChild(name);
    card.appendChild(height);
    card.appendChild(weight);

    container.appendChild(card);
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchContador(offset, limit);