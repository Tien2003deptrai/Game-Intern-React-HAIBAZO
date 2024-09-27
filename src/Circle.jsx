import React from 'react';

function Circle({ id, x, y, isClicked, onClick }) {
    const style = {
        position: 'absolute',
        top: `${y}%`,
        left: `${x}%`,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: isClicked ? 'red' : '#f0f0f0',
    };

    return (
        <div style={style} onClick={() => onClick(id)}>
            {id}
        </div>
    );
}

export default Circle;
