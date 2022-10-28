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

async function fetchPokemon(id){
    await fetch(`http://127.0.0.1:5000/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
        spinner.style.display = "none";
    });
}

async function fetchContador(offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        await fetchPokemon(i);
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
    sprite.classList.add('spriteimg');
    spriteContainer.appendChild(sprite);
    card.appendChild(spriteContainer);

    //ID
    const num = document.createElement('p');
    num.classList.add('name');
    num.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    card.appendChild(num);

    //NOMBRE
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;
    card.appendChild(name);

    //PESO Y ALTURA
    var contenedor = document.createElement('div');
    contenedor.classList.add('contenenedor');
    var contenedorpeso = document.createElement('div');
    contenedorpeso.classList.add('subcont');
    var contenedoraltura = document.createElement('div');
    contenedoraltura.classList.add('subcont');

    var imgpeso = document.createElement("img");
    imgpeso.classList.add('imgstyle');
    imgpeso.setAttribute("src", "./static/img/Vector.png");
    contenedorpeso.appendChild(imgpeso);
    var imgaltura = document.createElement("img");
    imgaltura.classList.add('imgstyle');
    imgaltura.setAttribute("src", "./static/img/height.png");
    contenedoraltura.appendChild(imgaltura);

    var textpeso = document.createElement('div');
    textpeso.textContent=`${pokemon.weight.toString()} kg`;
    textpeso.classList.add('parrafo');
    var textweight = document.createElement('div');
    textweight.textContent="Peso";
    textweight.classList.add('parrafo2');

    var textaltura = document.createElement('div');
    textaltura.textContent=`${pokemon.height.toString()} m`;
    textaltura.classList.add('parrafo');
    var textheight = document.createElement('div');
    textheight.textContent="Altura";
    textheight.classList.add('parrafo2');

    contenedorpeso.appendChild(textpeso);
    contenedorpeso.appendChild(textweight);
    contenedor.appendChild(contenedorpeso);
    contenedoraltura.appendChild(textaltura);
    contenedoraltura.appendChild(textheight);
    contenedor.appendChild(contenedoraltura);
    card.appendChild(contenedor);

    //TIPO
    const containerTipos= document.createElement('div')
    containerTipos.classList.add('typescontainer');
    let cant_tipos = pokemon.types.length;

    const textotipo = document.createElement('div');
    textotipo.classList.add('textos');
    textotipo.textContent = "Tipo(s):";
    card.appendChild(textotipo);

    for(let i = 0; i < cant_tipos; i++){
        const type = pokemon.types[i].type.name.toString();
        const pTipo=document.createElement('p')
        pTipo.classList.add('pTipo');
        pTipo.textContent = `${type}`;
        const tipo = document.createElement('div');
        const color = colors[type];
        tipo.classList.add('types');
        tipo.appendChild(pTipo)
        tipo.style.backgroundColor = color;
        containerTipos.appendChild(tipo)
        card.appendChild(containerTipos);
        if(i==0){
            //AGREGANDO COLOR
            const color = colors[type];
            card.style.backgroundColor = '#FFFFFF';
        }
    }
    
    //FORMA
    let cant_forma = pokemon.forms.length;

    for(let i = 0; i < cant_forma; i++){
        const forma = document.createElement('p');
        forma.classList.add('forma');
        if(pokemon.forms[i].name.toString() == pokemon.name){
            forma.textContent = "Forma: Original";
            card.appendChild(forma);
        }
        else{
            forma.textContent = `Forma: ${pokemon.forms[i].name.toString()}`;
            card.appendChild(forma);
        }
    }

    //HABILIDAD
    let cant_hab = pokemon.abilities.length;

    const textohab = document.createElement('div');
    textohab.classList.add('textos');
    textohab.textContent = "Habilidad(es):";
    card.appendChild(textohab);

    var aux = cant_hab;
    for(let i = 0; i < cant_hab; i++){
        aux--;
        if(aux>0){
            const habi = document.createElement('p');
            habi.classList.add('habi');
            habi.textContent = `${pokemon.abilities[i].ability.name.toString()} /`;
            card.appendChild(habi);
        }
        else{
            const habi = document.createElement('p');
            habi.classList.add('habi');
            habi.textContent = `${pokemon.abilities[i].ability.name.toString()}`;
            card.appendChild(habi);
        }
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