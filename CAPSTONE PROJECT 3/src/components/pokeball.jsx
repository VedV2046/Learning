import React, {useState} from "react";
import ClickSpark from "../ReactBits/ClickSpark";

function PokeBall() {
    const [isSpinning, setIsSpinning] = useState(false);

    function handleSpin() {
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
        }, 5000);
    }

    return(
        <ClickSpark sparkColor="rgba(255, 255, 255, 1)" sparkSize={28} sparkRadius={30} sparkCount={10} duration={900}>
            <div id="pokeball" onClick={handleSpin} className="pokeball-container">    
                <div className={`pokeball ${isSpinning ? "spin" : ""}`}></div>
            </div>
        </ClickSpark>
    ); 
}

export default PokeBall;
