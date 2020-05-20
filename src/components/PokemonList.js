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

    //function used change the pokemonList to the next set of pokemon
    //using the current state of next as its initial axios call
    //calls a toast notification that inidicates pokemonList is loading
    const changeNext = () => {
        fetchPokemonData(next)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    };

    //function used change the pokemonList to the previous set set of pokemon
    //using the current state of previous as its initial axios call
    //calls a toast notification that inidicates pokemonList is loading
    const changePrev = () => {
        fetchPokemonData(prev)
        toast.info('Pokemon loaded.', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
        })
    };

    //function used to display/hide modal and set currentPokemonData (the one to be displayed on modal)
    //to the one that was clicked and uses the id of clicked pokemon to fetch more data needed in the modal
    const handleModal = (pokemonId) => {
        //variable that will hold clicked pokemon 
        let currentPokemon = {}
        //only runs if modal is not displayed
        if(modalOpen === false){
            //axios call to fetch additional data of clickced pokemon using the passed pokemonId
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
            .then(res => {
                //logic used to find clicked pokemon in pokemonList state
                currentPokemon = pokemonList.find(item => item.id === pokemonId)
                //sets currentPokemonData to be the one found in previous function
                setCurrentPokemonData({
                    //spreads in currentPokemon variable and creates a new key and
                    // sets the value to pokemon's japanese name
                    ...currentPokemon,
                    jName: res.data.names[1].name
                });
                //after all data is fetched and set, the modal is opened up and displays data
                setModalOpen(true)
            })
            .catch(err => console.log(err))
        } else {
            //logic to close modal when open
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