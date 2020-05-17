import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  
  const fetchPokemonData = api => {
    let dataList = [];
    
    setPokemonList([])
    Axios.get( api || `https://pokeapi.co/api/v2/pokemon?limit=21`)
    .then(res => {
      setNext(res.data.next);
      setPrev(res.data.previous);
      res.data.results.map(item => {
        Axios.get(item.url)
        .then(res => {
          dataList = [...dataList, {...res.data,
            img: `https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`
          }]
          dataList.sort((a, b) => {
            return a.id - b.id;
          });
          setPokemonList(dataList);
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

  useEffect(() => {
    fetchPokemonData();
  }, []);
      
    return(
        <PokemonContext.Provider value={[pokemonList, fetchPokemonData, next, prev]}>
            {props.children}
        </PokemonContext.Provider>
    )
}
