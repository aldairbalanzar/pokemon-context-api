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
            normal: '3px solid rgba(153,152,152, .4)',
            flying: '3px solid rgba(121,164,255, .4)',
            fire: '3px solid rgba(250,85,67, .4)',
            poison: '3px solid rgba(165,90,156, .4)',
            psychic: '3px solid rgba(250,101,181, .4)',
            grass: '3px solid rgba(250,101,181, .4)',
            ground: '3px solid rgba(238,207,100, .4)',
            ice: '3px solid rgba(238,207,90, .4)',
            rock: '3px solid rgba(238,207,90, .4)',
            dragon: '3px solid rgba(138,118,255, .4)',
            water: '3px solid rgba(86,173,255, .4)',
            bug: '3px solid rgba(195,210,31, .4)',
            dark: '3px solid rgba(142,105,86, .4)',
            fighting: '3px solid rgba(170,89,69, .4)',
            ghost: '3px solid rgba(119,115,21, .4)',
            steel: '3px solid rgba(195,193,218, .4)',
            electric: '3px solid rgba(254,232,66, .4)',
            fairy: '3px solid rgba(250,173,255, .4)'
        }
        // if(types.length > 1) {
        //     console.log(types)
        //     types.map(type => {
        //         if(type.slot === 1) {
        //             switch(type.name){
        //                 case 'normal' : border = {
        //                     borderTop: typeBorder.normal,
        //                     borderLeft: typeBorder.normal
        //                 }
        //                 case 'flying' : border = {
        //                     borderTop: typeBorder.flying,
        //                     borderLeft: typeBorder.flying
        //                 }
        //                 return border
        //             }
        //         }else {

        //         }
        //     })
        // }else {
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
            // }
        }
    }

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