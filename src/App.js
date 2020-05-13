import React from 'react';
import { PokemonProvider } from './context/PokemonContext';
import PokemonList from './components/PokemonList'
import './App.css';

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <PokemonList/>
      </div>
    </PokemonProvider>
  );
}

export default App;
