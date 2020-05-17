import React from 'react';

const PokemonModal = ({ currentPokemonData }) => {
    return(
        <section>
            <div style={{
                width: '90%',
                margin: '3% auto 1%',
                display: 'flex',
                justifyContent: 'flex-left',
                flexWrap: 'wrap'
            }}>
                <h1
                style={{
                    width: '100%',
                    margin: '0'
                }}>
                    {currentPokemonData.name}
                </h1>
                <div>
                    <h4>Type: </h4>
                        {currentPokemonData.types.map(item => {
                            return(
                            <p key={item.slot}>{item.type.name}</p>
                            )
                        })}
                </div>
                <div
                style={{
                    width: '100%'
                }}>   
                    <img className='modal-img'
                    src={currentPokemonData.img}
                    alt={`pokemon, ${currentPokemonData.name}`}
                    style={{
                        width: '250px'
                    }}
                    />
                </div>
            </div>
        </section>
    )
}

export default PokemonModal;