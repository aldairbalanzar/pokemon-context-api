import React from 'react';

const PokemonCard = ({data}) => {
    return(
        <div className='pokemon-card' key={data.id}>
            <p className='pokemon-name'>{data.name}</p>
            <img className='pokemon-img' src={data.img} alt=""/>
        </div>
    )
}

export default PokemonCard;