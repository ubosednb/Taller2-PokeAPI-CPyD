from flask import Flask, render_template
from flask_cors import CORS
from flask import render_template
import requests

URL_pokemon = 'https://pokeapi.co/api/v2/pokemon/'
URL_pokemons = 'https://pokeapi.co/api/v2/pokemon?offset='

app = Flask(__name__)
CORS(app)

def pokes_api(inicio, final):
    get_pokemons = requests.get(f"{URL_pokemons}{inicio}{'&limit='}{final}")
    names = get_pokemons.json()
    return names

def poke_api(pok):
    get_pokemon = requests.get(f"{URL_pokemon}{pok}")
    name = get_pokemon.json()
    return name

@app.route("/pokemon/<id>")
def find_esentials(id):
    pokemon_info = poke_api(id)
    return pokemon_info

@app.route("/pokemons/<id_1>/<id_2>")
def find_pokemons(id_1, id_2):
    pokemons_info = pokes_api(id_1, id_2)
    return pokemons_info

@app.route("/")
def index():
    return render_template('./index.html')

if __name__ == "__main__":
    app.config['ENV'] = "development"
    app.run(debug=True)
