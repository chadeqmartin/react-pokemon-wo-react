import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    
  const fetchRandomPokemon = async () => {
    const randomNum = Math.floor(Math.random()*100) + 1
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`); // Replace '1' with a random Pokemon ID
        const data = response.data;
        displayPokemon(data);
        fetchTeamPokemon(data);
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
    }
}

const fetchTeamPokemon = async (randomPokemon) => {
    if (randomPokemon) {
        const pokemonTypes = randomPokemon.types.map((typeData) => typeData.type.name);
        try {
            const teamPokemonData = [];

            for (const type of pokemonTypes) {
                const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                const typeData = typeResponse.data;
                const randomPokemonOfType = typeData.pokemon[Math.floor(Math.random() * typeData.pokemon.length)];
                const teamPokemonResponse = await axios.get(randomPokemonOfType.pokemon.url);
                const teamPokemon = teamPokemonResponse.data;
                if (teamPokemonData.length < 10){
                teamPokemonData.push(teamPokemon);
                }
            }

            teamPokemonData.forEach(displayPokemon);
        } catch (error) {
            console.error('Error fetching team Pokemon:', error);
        }
    }
}

function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById('pokemon-container');
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    card.appendChild(name);
    card.appendChild(img);

    pokemonContainer.appendChild(card);
}

  
  return (
    <>
    <div class="App">
     <h1>Pokemon Theme Team</h1>
      <button onClick={fetchRandomPokemon}>Get Random Pokemon</button>
      <div className="pokemon-container">
          <div className="pokemon-card" id="pokemon-container">
          </div>
      </div>
      </div>
    </>
  );
}

export default App;

