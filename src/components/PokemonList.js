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

    //sets the border color of a card based on the pokemon's type(s)
    const setBorderColor = (types) => {
        let border = {};
        const typeBorder = {
            normal: '3px solid rgba(153,152,152, .45)',
            flying: '3px solid rgba(115,150,250, .45)',
            fire: '3px solid rgba(255,60,60, .45)',
            poison: '3px solid rgba(165,90,156, .45)',
            psychic: '3px solid rgba(250,101,181, .45)',
            grass: '3px solid rgba(158,222,79, .45)',
            ground: '3px solid rgba(248,180,80, .45)',
            ice: '3px solid rgba(238,207,90, .45)',
            rock: '3px solid rgba(204,187,113, .45)',
            dragon: '3px solid rgba(140,110,255, .45)',
            water: '3px solid rgba(86,173,255, .45)',
            bug: '3px solid rgba(195,210,31, .45)',
            dark: '3px solid rgba(142,105,86, .45)',
            fighting: '3px solid rgba(180,84,69, .45)',
            ghost: '3px solid rgba(119,115,21, .45)',
            steel: '3px solid rgba(195,193,218, .45)',
            electric: '3px solid rgba(254,232,66, .45)',
            fairy: '3px solid rgba(250,173,255, .45)'
        }
            switch(types[0].type.name){
                case 'normal' : return border = {
                border: typeBorder.normal
                    }
                case 'flying' : return border = {
                border: typeBorder.flying
                    }
                case 'fire' : return border = {
                border: typeBorder.fire
                    }
                case 'poison' : return border = {
                    border: typeBorder.poison
                    }
                case 'psychic' : return border = {
                    border: typeBorder.psychic
                    }
                case 'grass' : return border = {
                    border: typeBorder.grass
                    }
                case 'ground' : return border = {
                    border: typeBorder.ground
                    }
                case 'ice' : return border = {
                    border: typeBorder.ice
                    }
                case 'rock' : return border = {
                    border: typeBorder.rock
                    }
                case 'dragon' : return border = {
                    border: typeBorder.dragon
                    }
                case 'water' : return border = {
                    border: typeBorder.water
                    }
                case 'bug' : return border = {
                    border: typeBorder.bug
                    }
                case 'dark' : return border = {
                    border: typeBorder.dark
                    }
                case 'fighting' : return border = {
                    border: typeBorder.fighting
                    }
                case 'ghost' : return border = {
                    border: typeBorder.ghost
                    }
                case 'steel' : return border = {
                    border: typeBorder.steel
                    }
                case 'electric' : return border = {
                    border: typeBorder.electric
                    }
                case 'fairy' : return border = {
                    border: typeBorder.fairy
                    }
        }
    }

    //function used to display/hide modal and set currentPokemonData (the one to be displayed on modal)
    //to the one that was clicked and uses the id of clicked pokemon to fetch more data needed in the modal
    const handleModal = (pokemonId) => {
        let currentPokemon = {}
        if(modalOpen === false){
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
            .then(res => {
                currentPokemon = pokemonList.find(item => item.id === pokemonId)
                setCurrentPokemonData({
                    //creates a new key and sets the value to pokemon's japanese name
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
                        <div className='pokemon-card' style={setBorderColor(data.types)} onClick={() => handleModal(data.id)} key={data.id}>
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