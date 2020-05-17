import React from 'react';

const PokemonModal = ({ currentPokemonData }) => {
    //checks if pokemon is more than one type, if so... 
    //it makes sure to add a '/' to better separate the two types
    if(currentPokemonData.types.length > 1){
        currentPokemonData.types[0].type.name = `${currentPokemonData.types[0].type.name}/`         
    }
    return(
        <section>
            
            <div style={{
                width: '90%',
                margin: '2% auto 0',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>

                {/* Pokemon Name */}
                <div>
                    <h1 style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        {currentPokemonData.name}
                    </h1>
                </div>

                {/* Pokemon Type */}
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <p><strong>Type: </strong>
                    {
                    currentPokemonData.types.map(item => {
                    return <span key={item.slot}>{item.type.name}</span>
                    })
                    }</p>
                </div>
                
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    margin: '6% 0 0'
                }}>
                    <div style={{
                        width: '40%'
                    }}>   
                        {/* Pokemon Image */}
                        <img
                        src={currentPokemonData.img}
                        alt={`pokemon, ${currentPokemonData.name}`}
                        style={{
                            width: '250px'
                        }}
                        />
                    </div>
                    
                    {/* pokemon stats */}
                    <div style={{
                        width: '40%'
                    }}>
                        <p><strong>Stats: </strong></p>
                        {currentPokemonData.stats.map(item => {
                            return(
                            <p key={item.stat.name}>
                                {`${item.stat.name}: ${item.base_stat}`}
                            </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PokemonModal;