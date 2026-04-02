import React, {useState} from "react";
import axios from "axios";
import InputBox from "./input";
import "../styles/pokecard.css";

function Pokedex() {
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState("");

    async function handleSearch() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${search.toLowerCase()}`);
            setPokemon(response.data);
            console.log(response.data);
            console.log(speciesResponse)

            setPokemon({
            ...response.data,
            description: speciesResponse.data.flavor_text_entries
                .find(entry => entry.language.name === "en")
                .flavor_text
                .replace(/\f/g, " ") // removes weird line breaks in the text
            });

        }
        catch (error) {
            alert("Pokemon Not Found");
        }  
    }
    return(
        <>
        <InputBox setSearch={setSearch} handleSearch={handleSearch} />
        {pokemon && (
            <div className="pokeCard">
                <div className="poke-bg-clipper">
                    <div className="poke-watermark">{pokemon.name.substring(0, 3).toUpperCase()}</div>
                </div>
                
                <div className="poke-info">
                    <div className="poke-id">COLLECTOR ID #{pokemon.id.toString().padStart(4, '0')}</div>
                    <h2 className="poke-title">{pokemon.name}</h2>
                    
                    <div className="poke-types">
                        {pokemon.types.map(t => (
                            <span key={t.type.name} className="type-badge">{t.type.name}</span>
                        ))}
                    </div>
                    
                    <p className="poke-description">{pokemon.description}</p>
                    
                    <hr className="poke-divider" />
                    
                    <div className="poke-specs-grid">
                        <div className="poke-spec">
                            <span className="poke-label">Height</span>
                            <span className="poke-value">{(pokemon.height) / 10} m ({Math.floor(pokemon.height * 3.93701 / 12)}'{Math.round(pokemon.height * 3.93701 % 12).toString().padStart(2, '0')}")</span>
                        </div>

                        <div className="poke-spec">
                            <span className="poke-label">Weight</span>
                            <span className="poke-value">{(pokemon.weight) / 10} kg</span>
                        </div>
                    </div>
                </div>

                <div className="poke-image-container">
                    <img 
                        className="poke-img"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}
                    />
                </div>
            </div>
        )}
        </>    
    );
}

export default Pokedex;