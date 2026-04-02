import React from "react";

function InputBox({ setSearch, handleSearch }) {
    return(
        <div className="input-box" style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 9999,
            display: 'flex',
            gap: '10px'
        }}>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Enter Pokemon" style={{ padding: '8px 200px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button onClick={handleSearch} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#f23d2d', color: 'white', fontWeight: 'bold' }}>Submit</button>
        </div>
    );
}

export default InputBox;