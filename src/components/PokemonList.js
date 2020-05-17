import React, { useContext, useState } from 'react';
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
    const [currentPokemonData, setCurrentPokemonData] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

    // console.log('pokemonList component: ', pokemonList )
    console.log(currentPokemonData.types);
    // console.log(next);
    // console.log(prev);

    const changeNext = () => {
        fetchPokemonData(next)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    };

    const changePrev = () => {
        fetchPokemonData(prev)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    };

    const handleModal = (pokemonId) => {
        if(modalOpen === false){
            setModalOpen(true)
            setCurrentPokemonData(pokemonList[pokemonId - 1]);
        } else {
            setModalOpen(false)
        }
    }

    return(
        <>
            <section className='pokemon-list'>
                {pokemonList.map(data => {
                    return(
                        <div className='pokemon-card' onClick={() => handleModal(data.id)} key={data.id}>
                            <PokemonCard data={data} key={data.id}/>
                        </div>
                    )
                })}
                
                <Modal isOpen={modalOpen} onRequestClose={handleModal}>
                    <PokemonModal currentPokemonData={currentPokemonData} />
                    <button onClick={handleModal}>close</button>
                </Modal>
                <button className='pagination-button' onClick={changePrev}>previous</button>
                <button className='pagination-button' onClick={changeNext}>next</button>
            </section>
        </>
    )
}

export default PokemonList;