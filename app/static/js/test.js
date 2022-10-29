const container = document.querySelector(".container");
const spinner = document.querySelector("#spinner");

var offset = null;
var limit = null;

//Se crea función para botón de Mostrar pokemon
function verPokemones(){
    removeChildNodes(container);
    offset = document.getElementById('inicio').value - 1;

    limit = document.getElementById('final').value;
    //Solo muestra hasta el pokemon 897, si se ingresa uno mayor a ese, no aparecera
    if(offset<=897){
        fetchPokemons(offset, limit);
    }
}

//Función fetch para traer datos de la API
async function fetchPokemons(inicio, final){
    await fetch(`http://127.0.0.1:5000/pokemons/${inicio}/${final}`)
    .then((res) => res.json())
    .then((data) => {
        createPokemons(data)
    });
}

//Función para crear cada pokemon, con sus datos
async function createPokemons(pkmon){
        for (var i = 0; i < pkmon.results.length; i++) {
            await fetch(pkmon.results[i].url)
            .then((res) => res.json())
            .then((data) => {
                createPokemon(data);
                spinner.style.display = "none";
        });
    }
}

//Colores según los tipos de pokemon
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

//Traducciones según los tipos de pokemon
const translations = {
	normal: 'Normal',
	fire: 'Fuego',
	water: 'Agua',
	electric: 'Eléctrico',
	grass: 'Planta',
	ice: 'Hielo',
	fighting: 'Lucha',
	poison: 'Veneno',
	ground: 'Tierra',
	flying: 'Volador',
	psychic: 'Psíquico',
	bug: 'Bicho',
	rock: 'Roca',
	ghost: 'Fantasma',
	dragon: 'Dragón',
	dark: 'Siniestro',
	steel: 'Acero',
	fairy: 'Hada',
};
const main_types = Object.keys(colors);

// Funcion que crea cada unos de los pokemon, para luego ser agregados al html
function createPokemon(pokemon){

    //Se crea el div que contenera todos los datos del pokemon
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    //SPRITE
    const spriteContainer = document.createElement('div');       // Se rescata el sprite desde el objeto pokemon
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    sprite.classList.add('spriteimg');
    spriteContainer.appendChild(sprite);
    card.appendChild(spriteContainer);

    //ID
    const num = document.createElement('p');             // Se le agrega el ID en un p tag
    num.classList.add('name');
    num.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    card.appendChild(num);

    //NOMBRE
    const name = document.createElement('p');          // Se le agrega el nombre en un p tag
    name.classList.add('name');
    name.textContent = pokemon.name;
    card.appendChild(name);

    //PESO Y ALTURA
    var contenedor = document.createElement('div');  // Se crea contenedor para ingresar el peso y altura
    contenedor.classList.add('contenenedor');
    var contenedorpeso = document.createElement('div');  // Se crea contenedor para el peso
    contenedorpeso.classList.add('subcont');
    var contenedoraltura = document.createElement('div');  // Se crea contenedor para la altura
    contenedoraltura.classList.add('subcont');

    var imgpeso = document.createElement("img");
    imgpeso.classList.add('imgstyle');
    imgpeso.setAttribute("src", "./static/img/Vector.png");   // Agregando Icono para el peso
    contenedorpeso.appendChild(imgpeso);
    var imgaltura = document.createElement("img");               
    imgaltura.classList.add('imgstyle');
    imgaltura.setAttribute("src", "./static/img/height.png");  // Agregando icono para la altura
    contenedoraltura.appendChild(imgaltura);

    var textpeso = document.createElement('div');       // Agregando texto que contiene el peso
    peso=pokemon.weight/10;               
    textpeso.textContent=`${peso.toString()} kg`;     
    textpeso.classList.add('parrafo');
    var textweight = document.createElement('div');               
    textweight.textContent="Peso";
    textweight.classList.add('parrafo2');

    var textaltura = document.createElement('div');     //Agregando texto que contiene la altura
    altura = pokemon.height/10;           
    textaltura.textContent=`${altura.toString()} m`;          // Se rescasta el peso de la altura
    textaltura.classList.add('parrafo');                            
    var textheight = document.createElement('div'); 
    textheight.textContent="Altura";                               // Se agrega texto altura
    textheight.classList.add('parrafo2');

    contenedorpeso.appendChild(textpeso);                          // Se añade el texto al contenedor
    contenedorpeso.appendChild(textweight);                        // Se añade el texto al contenedor
    contenedor.appendChild(contenedorpeso);                        // Se añade el subcontenedor de peso al contenedor principal
    contenedoraltura.appendChild(textaltura);                      // Se añade el texto al contenedor
    contenedoraltura.appendChild(textheight);                      // Se añade el texto al contenedor
    contenedor.appendChild(contenedoraltura);
    card.appendChild(contenedor);                             // Se añade toda la seccion de peso y altura a la carta

    //TIPO
    const containerTipos= document.createElement('div')          // Se crean contenedores para el tipo
    containerTipos.classList.add('typescontainer');              // Se le añade la clase desde css
    let cant_tipos = pokemon.types.length;                      // Cantidad de tipos de cada pokemon ( 1 o 2)
    const textotipo = document.createElement('div');           // texto para el tipo
    textotipo.classList.add('textotipo');
    textotipo.textContent = "Tipo(s):";
    card.appendChild(textotipo);

    for(let i = 0; i < cant_tipos; i++){                             // Se recorre por cada tipo que posee cada pokemon
        const type = pokemon.types[i].type.name.toString();         //  Se rescata el string correspondiente al tipo
        const pTipo=document.createElement('p')
        pTipo.classList.add('pTipo');
        const tipoEsp = translations[type];                            // Se traduce al Español
        pTipo.textContent = `${tipoEsp}`;                             // Se añade al div del tipo
        const tipo = document.createElement('div');
        const color = colors[type];                              // Se añade su color correspondiente
        tipo.classList.add('types');                            
        tipo.appendChild(pTipo)                       
        tipo.style.backgroundColor = color;              // Se le añade el color por el style
        containerTipos.appendChild(tipo)
        card.appendChild(containerTipos);
        if(i==0){
            //AGREGANDO COLOR
            const color = colors[type];                       // Se le añade color al fondo de la imagen del pokemon
            spriteContainer.style.backgroundColor = color;
            spriteContainer.style.borderRadius = '10px';         // Se le añade borde circular al espacio correspondiente a la imagen
        }
    }
    
    //FORMA
    let cant_forma = pokemon.forms.length;                             // Se rescara la forma desde el objeto pokemon
    for(let i = 0; i < cant_forma; i++){                             // Se recorre cada forma que tenga el pokemon
        const forma = document.createElement('p');
        if(pokemon.forms[i].name.toString() == pokemon.name){             // Si es que la forma es igual al nombre, significa que es la original
            forma.textContent = "Forma: Original";                        
        }
        else{
            forma.textContent = `Forma: ${pokemon.forms[i].name.toString()}`;  // Si no es igual se muestra su forma en la carta
        }
        card.appendChild(forma);
    }

    //HABILIDAD
    let cant_hab = pokemon.abilities.length;                   // Se rescata la habilidad desde el objeto pokemon
    const textohab = document.createElement('div');            
    card.appendChild(textohab);
    for(let i = 0; i < cant_hab; i++){
        const habi = document.createElement('p');               // Se crea un p tag por elemento
        var aux = pokemon.abilities;
        
        habi.classList.add('habi');                                                 
        if(aux[i].is_hidden == false){                     // Se revisa si es una habilidad oculta
            var aux2 = pokemon.abilities[i].ability.name.toString();
            aux2 = aux2.replace("-"," ");
            aux2 = aux2.charAt(0).toUpperCase() + aux2.slice(1); // Dandole formato al string
            habi.textContent = `Habilidad: ${aux2}\t`;
        }
        else{
            var aux2 = pokemon.abilities[i].ability.name.toString();
            aux2 = aux2.replace("-"," ");
            aux2 =  aux2.charAt(0).toUpperCase() + aux2.slice(1);  // Dandole formato al string
            habi.textContent = `Habilidad Oculta: ${aux2}\t`;
        }
        card.appendChild(habi);
    }

    //UBICACION
    const location = document.createElement('p');         // Se le asigna su ubicacion en base a su region, y su id  
    location.classList.add('name');
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


//Función para eliminar de la pantalla una card (Pokemon)
function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

