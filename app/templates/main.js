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
    fetch(`http://127.0.0.1:5000/pokemon/${id}`)
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

const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};
const main_types = Object.keys(colors);

function createPokemon(pokemon){

    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    // SPRITE
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);
    card.appendChild(spriteContainer);

    //ID
    const num = document.createElement('p');
    num.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    card.appendChild(num);

    //NOMBRE
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;
    card.appendChild(name);

    //ALTURA
    const height = document.createElement('p');
    height.classList.add('height');
    height.textContent = `Altura: ${pokemon.height.toString()}`;
    card.appendChild(height);

    //PESO
    const weight = document.createElement('p');
    weight.classList.add('weight');
    weight.textContent = `Peso: ${pokemon.weight.toString()}`;
    card.appendChild(weight);

    //TIPO
    let cant_tipos = pokemon.types.length;
    for(let i = 0; i < cant_tipos; i++){
        const tipo = document.createElement('p');
        type = pokemon.types[i].type.name.toString();
        tipo.classList.add('tipo');
        tipo.textContent = `Tipo: ${type}`;
        card.appendChild(tipo);
        if(i==0){
            //AGREGANDO COLOR
            const color = colors[type];
            card.style.backgroundColor = color;
        }
    }
    
    //FORMA
    const forma = document.createElement('p');
    forma.classList.add('forma');
    forma.textContent = `Forma: ${pokemon.forms[0].name.toString()}`;
    card.appendChild(forma);

    //HABILIDAD
    let cant_hab = pokemon.abilities.length;
    for(let i = 0; i < cant_hab; i++){
        const habi = document.createElement('p');
        habi.classList.add('habi');
        habi.textContent = `Habilidad: ${pokemon.abilities[i].ability.name.toString()}`;
        card.appendChild(habi);
    }

    //UBICACION
    const location = document.createElement('p');
    location.classList.add('location');
    if(pokemon.id>=1 && pokemon.id<=151){
        location.textContent = `Ubicación: Kanto`;
    }
    else if(pokemon.id>=152 && pokemon.id<=251){
        location.textContent = `Ubicación: Johto`;
    }
    else if(pokemon.id>=252 && pokemon.id<=386){
        location.textContent = `Ubicación: Hoenn`;
    }
    else if(pokemon.id>=387 && pokemon.id<=493){
        location.textContent = `Ubicación: Sinnoh`;
    }
    else if(pokemon.id>=494 && pokemon.id<=649){
        location.textContent = `Ubicación: Unova`;
    }
    else if(pokemon.id>=650 && pokemon.id<=721){
        location.textContent = `Ubicación: Kalos`;
    }
    else if(pokemon.id>=722 && pokemon.id<=809){
        location.textContent = `Ubicación: Alola`;
    }
    else if(pokemon.id>=810 && pokemon.id<=905){
        location.textContent = `Ubicación: Galar`;
    }
    card.appendChild(location);

    container.appendChild(card);
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchContador(offset, limit);