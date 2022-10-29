# Taller 2 - CPyD Sección 412
![Image_text](/app/static/img/Logo_UTEM.jpg)
API REST de consulta que obtenga los datos de los personajes Pokémon (POKEDEX).<br>
En el siguiente repositorio se encuentra el Taller N°2 de la asignatura **Computación Paralela y Distribuida**.

## Integrantes:
* Martín Sobarzo
* Cristóbal Abarca
* Rodrigo Ubilla
* Renato Palominos
* Matías Álvarez

## Instalación BASH Windows:
```bash 
En caso de trabajar en Windows se debe instalar Git Bash desde el siguiente enlace: https://git-scm.com/downloads
Instalar de forma normal y agregar al PATH de Windows.

Posterior activar la SSH Key de GITHUB con las instrucciones del siguiente enlace:
https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

## Clonación de Repositorio:
Se debe clonar el repositorio desde la terminal con el siguiente comando:
```bash 
$ git clone https://github.com/ubosednb/Taller2-PokeAPI-CPyD
```

### Linux
Se debe verificar que Python y en caso que no lo esté, instalarlo:
_Debian Based: sudo apt_
_Arch Linux Based: sudo pacman_
```bash 
$ sudo apt install python3 / sudo pacman -S python
$ python --version
```
Luego de instalar Python, seguir las siguientes instrucciones en la carpeta del repositorio clonado:

```bash 
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip3 install -r requirements.txt
$ export FLASK_APP=app/app.py
$ flask run
```

### Windows
Se debe descargar e instalar una versión superior a Python 3.8 desde la web oficial
```bash 
https://www.python.org/downloads/
```
Una ves descargado el instalador, agregar la opcion Add to PATH, y luego verficar desde una terminal si este se instaló correctamente con el comando:
```bash 
python --version
```
Si este se muestra instalado, continuar con los siguientes pasos desde GIT BASH dentro de la carpeta del repositorio:

```bash 
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
set FLASK_APP=app\app.py
flask run
```

## Uso:
Abrir en navegador:<br>
localhost:5000<br>
o<br>
127.0.0.1:5000<br>

Y Utilizar el Servicio Rest a comodidad.