import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  
  //fetches initial pokemon list from pokeapi.co (pokemon data) and pokeres.bastionbot.org (pokemon image)
  const fetchPokemonData = api => {
    let dataList = [];
    //empties pokemonList (necessary for pagination)
    setPokemonList([])
    Axios.get( api || `https://pokeapi.co/api/v2/pokemon?limit=42`)
    .then(res => {
      //sets the state for the next and previous pokemon urls (necessary for pagination)
      setNext(res.data.next);
      setPrev(res.data.previous);
      res.data.results.map(item => {
        Axios.get(item.url)
        .then(res => {
          dataList = [...dataList, {...res.data,
            //adds a new img key to the object that sets their image url to be from the 2nd api
            img: `https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`,
            name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)
          }]
          dataList.sort((a, b) => {
            return a.id - b.id;
          });
          setPokemonList(dataList)
        })
        .catch(err => {
          console.log('2nd axios: ', err)
        })
      })
    })
    .catch(err => {
      console.log('1st axios: ', err)
    })
  };

  //runs the fetchPokemonData on initial app render
  useEffect(() => {
    fetchPokemonData();
  }, []);
      
    return(
        <PokemonContext.Provider value={[pokemonList, fetchPokemonData, next, prev]}>
            {props.children}
        </PokemonContext.Provider>
    )
}
