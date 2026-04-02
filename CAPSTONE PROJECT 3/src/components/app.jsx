import React from "react";
import Header from "./header";
import PokeBall from "./pokeball";
import DotGrid from "../ReactBits/DotGrid";
import Pokedex from "./pokedex";

function App() {
  return (
    <div>
        <Header />
        <PokeBall/>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <DotGrid
                dotSize={8}
                gap={12}
                baseColor="#a50000ff"
                activeColor="#ff0000ff"
                proximity={40}
                shockRadius={50}
                shockStrength={10}
                resistance={100}
                returnDuration={12}
            />   
            <Pokedex />
        </div>
    </div>
  );
}

export default App;