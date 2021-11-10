import { Component } from 'react';
import CardPokemon from "./card-pokemon"

class ListarPokemones extends Component {

    constructor() {
        super();
        this.state = {
            pokemons: [],
            pokemonDetails: [],
            offset: 0,
            loadMunber: 24
        }
        this.handlePokemonClick = this.handlePokemonClick.bind(this);
    }

    getNextOffset() {
        return this.state.offset + this.state.loadMunber;
    }

    handlePokemonClick(event) {
        const newoffset = this.getNextOffset();
        this.setState({ offset: newoffset }, () => {
            this.cargarPokemon();
        });
    }

    componentDidMount() {
        this.cargarPokemon();
    }


    cargarPokemon() {
        let url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset + "&limit=" + this.state.loadMunber;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({ pokemons: data.results })

                    this.state.pokemons.map(pokemon => {
                        fetch(pokemon.url)
                            .then(response => response.json())
                            .then(data => {
                                if (data) {
                                    var temp = this.state.pokemonDetails
                                    temp.push(data);
                                    this.setState({ pokemonDetails: temp })
                                }
                            })
                            .catch(console.log)
                    })
                }
            })
            .catch(console.log)
    }

    render() {
        const { pokemonDetails } = this.state;

        const listadoPokemonRender = pokemonDetails.map((pokemon, index) => {
            return (<CardPokemon pokemon={pokemon} />);
        });

        return (
            <div>
                <div className="container">
                    <div className="card-columns" >
                        {listadoPokemonRender}
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={this.handlePokemonClick} >
                    Cargar Pokemon
                </button>
            </div>
        );
    }
}

export default ListarPokemones;