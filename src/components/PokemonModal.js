import React from 'react';

const PokemonModal = ({ currentPokemonData }) => {
    return(
        <section>
            <div>
                <h1>{currentPokemonData.name}</h1>
                {currentPokemonData.types.map(item => {
                    return(
                    <h3>{item.type.name}</h3>
                    )
                })}
                <img src={currentPokemonData.img} alt={'pokemon', currentPokemonData.name}/>
            </div>
        </section>
    )
}

export default PokemonModal;