from flask import Flask, render_template
import requests

URL_pokemon = 'https://pokeapi.co/api/v2/pokemon-species/'
URL_translate = 'https://api.funtranslations.com/translate/'

app = Flask(__name__)


def poke_api(pok):
    get_pokemon = requests.get(f"{URL_pokemon}{pok}")

    name = get_pokemon.json()['name']
    is_legendary = get_pokemon.json()['is_legendary']
    habitat = get_pokemon.json()['habitat']['name'] if get_pokemon.json()['habitat'] else get_pokemon.json()['habitat']
    description = get_pokemon.json()['flavor_text_entries'][0]['flavor_text']

    return name, is_legendary, habitat, description


@app.route("/pokemon/<pok>")
def pokemon(pok):
    pokemon_info = poke_api(pok)

    return f"Name: {pokemon_info[0]}<br>Legendary: {str(pokemon_info[1])}" \
           f"<br>Habitat: {pokemon_info[2]}<br>Description: {pokemon_info[3]}"


@app.route("/pokemon/translated/<pok>")
def translated(pok):
    pokemon_info = poke_api(pok)
    data = {'text': pokemon_info[3]}
    style = 'shakespeare'

    if pokemon_info[2] == 'cave' or pokemon_info[1]:
        style = 'yoda'

    trans = requests.post(f'{URL_translate}{style}', data=data)
    fun_description = trans.json()['contents']['translated']

    return f"Name: {pokemon_info[0]}<br>Legendary: {str(pokemon_info[1])}" \
           f"<br>Habitat: {pokemon_info[2]}<br>Description: {fun_description}"

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
     app.config['ENV'] = "development"
     app.run(debug=True)
