import React from 'react';

const PokemonModal = ({ currentPokemonData }) => {
    const { name, types, img, stats } = currentPokemonData
    //checks if pokemon is more than one type, if so... 
    //it makes sure to add a '/' to better separate the two types
    if(types.length > 1){
        types[0].type.name = `${types[0].type.name}/`         
    };

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
                        {name}
                    </h1>
                </div>

                {/* Pokemon Type */}
                <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center'
                }}>
                    <p><strong>Type: </strong>{
                    types.map(item => {
                    return <span key={item.slot}>{item.type.name}</span>
                    })
                    }</p>
                </div>
                
                <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '5% 0 0'
                }}>
                        {/* Pokemon Image */}
                        <img
                        src={img}
                        alt={`pokemon, ${name}`}
                        style={{
                            width: '210px',
                            height: '210px'
                        }}/>
                    
                        {/* Pokemon Stats */}
                        <p><strong>Stats: </strong></p>
                        {stats.map(item => {
                            return(
                                <p style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center'
                                }} key={item.stat.name}>
                                {`${item.stat.name}: ${item.base_stat}`}
                                </p>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}

export default PokemonModal;