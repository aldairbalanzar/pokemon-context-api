import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  
  //fetches initial pokemon list from pokeapi.co (pokemon data) and pokeres.bastionbot.org (pokemon image)
  const fetchPokemonData = api => {
    //variable that will contain the pokemon list so that the list can be sorted before setting it to state
    let dataList = [];
    
    //empties pokemonList (necessary for pagination)
    setPokemonList([])
    //fetches first 21 pokemon urls
    Axios.get( api || `https://pokeapi.co/api/v2/pokemon?limit=21`)
    .then(res => {
      //sets the state for the next and previous pokemon urls (necessary for pagination)
      setNext(res.data.next);
      setPrev(res.data.previous);
      //maps the fetched results from the initial axios call and...
      res.data.results.map(item => {
        //makes an axios call for each one using the url included in the response from the first call 
        Axios.get(item.url)
        .then(res => {
          //once each axios call fetches the pokemon data, the previous list gets spread in and
          //then spreading in the next axios response in an object
          dataList = [...dataList, {...res.data,
            //adds a new img key to the object that sets their image url to be from the 2nd api
            img: `https://pokeres.bastionbot.org/images/pokemon/${res.data.id}.png`,
            //capitalizes the name value of a pokemon
            name: res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)
          }]
          //sorts the dataList array by pokemon id before being set to state 
          dataList.sort((a, b) => {
            return a.id - b.id;
          });
          //after fetching and changing the data, then it gets set to state, ready to be displayed
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
