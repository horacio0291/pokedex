// Declaraciones
//--------------

// Array de todos los Pokemon (que estan en data.js)
const allPokemon = [bulbasaur, charmander, squirtle, pikachu, eevee, mew, pidgey, zubat]
// Equipo
let equipoPokemon = []


// Query de Elementos
//-------------------

// Lista de Pokemon
const pokemonListContainer = document.querySelector('.menu')

// Partes de la card
const cardName = document.querySelector('.cardName')
const cardId = document.querySelector('.cardId')
const cardType = document.querySelector('.cardType')
const cardDesc = document.querySelector('.cardDesc')
const cardLink = document.querySelector('.cardLink')
const cardTop = document.querySelector('.cardTop')
const cardCTA = document.querySelector('.cardCTA')

// Equipo
const teamContainer = document.querySelector('.teamContainer')


// Funciones
//----------

const renderizarListaPokemon = () => {
    allPokemon.forEach((pokemon) => {
        const pokemonButton = document.createElement('button')
        pokemonButton.className = 'menuTab'
        pokemonButton.setAttribute('data-id', pokemon.id)
        pokemonButton.innerHTML = `
            <div class="menuTabImg">
                <img src="${pokemon.icon}" alt="${pokemon.name}">
            </div>
            <span class="menuTabText"> ${pokemon.name} </span>
        `
        pokemonListContainer.append(pokemonButton)
    })
    agregarListenerBotones()
}

const renderizarDatosPokemon = (e) => {
    const pokemonIdSelected = e.target.closest('.menuTab').getAttribute('data-id')
    const pokemonSelected = allPokemon.find((pokemon) => pokemon.id == pokemonIdSelected)

    cardName.textContent = pokemonSelected.name
    cardId.textContent = `#${pokemonSelected.id}`
    cardType.textContent = pokemonSelected.type
    cardDesc.textContent = pokemonSelected.desc
    cardLink.setAttribute('href', pokemonSelected.url)
    cardTop.style.backgroundColor = pokemonSelected.typeColor
    cardTop.style.backgroundImage = `url(${pokemonSelected.img})`
    cardCTA.style.backgroundColor = pokemonSelected.typeColor
    cardCTA.setAttribute('data-id', pokemonSelected.id)
}

const eliminarPokemonDeEquipo = (e) => {
    const pokemonIdSelected = e.target.closest('.teamPokemon').getAttribute('data-id')
    equipoPokemon = equipoPokemon.filter((pokemon) => pokemon.id != pokemonIdSelected)
    console.log(equipoPokemon);
    renderizarEquipoPokemon()
}

const renderizarEquipoPokemon = () => {
    teamContainer.innerHTML = ''
    equipoPokemon.forEach((pokemon) => {
        const pokemonTeamButton = document.createElement('div')
        pokemonTeamButton.className = 'teamPokemon'
        pokemonTeamButton.setAttribute('data-id', pokemon.id)
        pokemonTeamButton.innerHTML = `
            <img src="${pokemon.icon}" alt="${pokemon.name}"></img>
        ` 
        teamContainer.append(pokemonTeamButton)
    })
    document.querySelectorAll('.teamPokemon').forEach((pokemon) => {
        pokemon.addEventListener('click', eliminarPokemonDeEquipo)
    })
}

const agregarPokemonAEquipo = (e) => {
    const pokemonIdSelected = e.target.getAttribute('data-id')
    const pokemonSelected = allPokemon.find((pokemon) => pokemon.id == pokemonIdSelected)
    if (equipoPokemon.length < 6) {
        equipoPokemon.push(pokemonSelected)
    } else {
        alert('Maximo de 6')
    }
    localStorage.setItem('equipoPokemon', JSON.stringify(equipoPokemon))
    renderizarEquipoPokemon()
}

const agregarListenerBotones = () => {
    const pokemonButton = document.querySelectorAll('.menuTab')
    pokemonButton.forEach((button) => {
        button.addEventListener('click', renderizarDatosPokemon)
    })
}


// EventListeners
//---------------

cardCTA.addEventListener('click', agregarPokemonAEquipo)


// Ejecuciones
//------------

renderizarListaPokemon()
