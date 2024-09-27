import React from 'react';

function GameStatus({ points, time, inputPoints, setInputPoints, playing, onPlayRestart }) {
    return (
        <div className="game-status">
            <div>
                <strong>Points:</strong>
                <input
                    type="number"
                    value={inputPoints}
                    onChange={(e) => setInputPoints(Number(e.target.value))}
                    min="1"
                    max="100"
                />
            </div>
            <div>
                <strong>Time:</strong> <span>{time.toFixed(1)}s</span>
            </div>
            <button onClick={onPlayRestart}>
                {playing ? 'Restart' : 'Play'}
            </button>
        </div>
    );
}

export default GameStatus;
