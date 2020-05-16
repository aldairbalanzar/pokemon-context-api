import React, {useContext} from 'react';
import { PokemonContext } from '../context/PokemonContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import '../App.scss';

toast.configure()
const PokemonList = () => {
    const [ pokemonList, fetchPokemonData, next, prev ] = useContext(PokemonContext);

    // console.log('pokemonList component: ', pokemonList )
    // console.log(next);
    // console.log(prev);

    const changeNext = () => {
        fetchPokemonData(next)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    }

    const changePrev = () => {
        fetchPokemonData(prev)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    }

    return(
        <>
            <section className='pokemon-list'>
                {pokemonList.map(data => {
                    return(
                        <PokemonCard data={data} />
                    )
                })}
                <Modal isOpen={false}>
                    <PokemonModal />
                </Modal>
                <button className='pagination-button' onClick={changePrev}>previous</button>
                <button className='pagination-button' onClick={changeNext}>next</button>
            </section>
        </>
    )
}

export default PokemonList;