import React, {useContext} from 'react';
import { PokemonContext } from '../context/PokemonContext'
import '../App.scss';

const PokemonList = () => {
    const [ pokemonList, fetchPokemonData, next, prev ] = useContext(PokemonContext);

    console.log('pokemonList component: ', pokemonList )
    console.log(next);
    console.log(prev);

    const changeNext = () => {
        fetchPokemonData(next)
    }

    const changePrev = () => {
        fetchPokemonData(prev)
    }

    return(
        <>
            <section className='pokemon-list'>
                {pokemonList.map(item => {
                    return(
                    <div className='pokemon-card' key={item.id}>
                        <p className='pokemon-name'>{item.name}</p>
                        <img className='pokemon-img' src={item.img} alt=""/>
                    </div>
                    )
                })}
            </section>

            <button className='pagination-button' onClick={changePrev}>previous</button>
            <button className='pagination-button' onClick={changeNext}>next</button>
        </>
    )
}

export default PokemonList;