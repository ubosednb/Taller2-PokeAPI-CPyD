from flask import Flask
from flask_cors import CORS
import requests

URL_pokemon = 'https://pokeapi.co/api/v2/pokemon/'
URL_translate = 'https://api.funtranslations.com/translate/'

app = Flask(__name__)
CORS(app)


def poke_api(pok):
    get_pokemon = requests.get(f"{URL_pokemon}{pok}")
    name = get_pokemon.json()
    return name


@app.route("/pokemon/<id>")
def find_esentials(id):
    pokemon_info = poke_api(id)
    return pokemon_info
"""
@app.route("/pokemon/<id>/types")
def find_type(id):
    pokemon_info = poke_api(id)
    return f"Types: {pokemon_info['types'][0]['type']['name']}"

@app.route("/pokemon/<id>/ubicacion")
def find_lo(id):
    pokemon_info = poke_api(id)
    return f"Types: {pokemon_info['types'][0]['type']['name']}"

"""

@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == "__main__":
     app.config['ENV'] = "development"
     app.run(debug=True)
