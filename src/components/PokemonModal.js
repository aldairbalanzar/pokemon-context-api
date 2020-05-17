import React from 'react';

const PokemonModal = ({ currentPokemonData }) => {
    return(
        <section>
            <div className='modal'>
                <h1>{currentPokemonData.name}</h1>
                {currentPokemonData.types.map(item => {
                    return(
                    <h3 key={item.slot}>{item.type.name}</h3>
                    )
                })}
                <img className='modal-img' src={currentPokemonData.img} alt={`pokemon, ${currentPokemonData.name}`}/>
            </div>
        </section>
    )
}

export default PokemonModal;