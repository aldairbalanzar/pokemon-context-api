import React, { useContext, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import '../App.scss';

Modal.setAppElement('#root')
toast.configure()
const PokemonList = () => {
    const [ pokemonList, fetchPokemonData, next, prev ] = useContext(PokemonContext);
    const [currentPokemonData, setCurrentPokemonData] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    // console.log('pokemonList component: ', pokemonList )
    // console.log('currenPokemonData: ', currentPokemonData);
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
        let currentPokemon = {}
        if(modalOpen === false){
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
            .then(res => {
                console.log(res.data)
                currentPokemon = pokemonList.find(item => item.id === pokemonId)
                setCurrentPokemonData({
                    ...currentPokemon,
                    jName: res.data.names[1].name
                });
                setModalOpen(true)
            })
            .catch(err => console.log(err))
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
                    <button style={{float: 'right', margin: '3% 0 %1', padding: '1% 2%'}}
                    onClick={handleModal}>
                    close
                    </button>
                </Modal>
                <div className='pagination-button-container'>
                    <button className='pagination-button' onClick={changePrev}>previous</button>
                    <button className='pagination-button' onClick={changeNext}>next</button>
                </div>
            </section>
        </>
    )
}

export default PokemonList;