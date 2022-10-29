async function fetchPokemons(inicio, final){
    
    await fetch(`http://127.0.0.1:5000/pokemons/${inicio}/${final}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        
    });
}

fetchPokemons(1, 9);