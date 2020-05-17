import React from 'react';

const PokemonCard = ({data}) => {
    return(
        <div key={data.id}>
            <h2 className='pokemon-name'>{data.name}</h2>
            <img className='pokemon-img' src={data.img} alt={`pokemon, ${data.name}`}/>
        </div>
    )
}

export default PokemonCard;