import React from "react";

const CardPokemon = ({ pokemon }) => {
    return (
        <>
            <div className="card text-center mx-auto" key={pokemon.id}></div>
            <div className="card-header"><b>{pokemon.name}</b></div>
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted"> Identificador : {pokemon.id} </h6>
                <img src={pokemon.sprites['front_default']} alt="Pokemon" />
                <img src={pokemon.sprites['back_default']} alt="Pokemon" />
            </div>
        </>
    )
};

export default CardPokemon