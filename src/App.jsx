import React, { useState, useEffect } from 'react';
import Circle from './Circle';
import GameStatus from './GameStatus';

function App() {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [circles, setCircles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [inputPoints, setInputPoints] = useState(3);
  const [nextExpectedId, setNextExpectedId] = useState(1);
  const [allCleared, setAllCleared] = useState(false);

  useEffect(() => {
    if (circles.length === 0 && playing && !gameOver) {
      setGameOver(true);
      setAllCleared(true);
    }
  }, [circles, playing, gameOver]);

  useEffect(() => {
    let timer;
    if (playing && !gameOver) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [playing, gameOver]);

  const handleCircleClick = (id) => {
    if (id === nextExpectedId) {
      setCircles(circles.map(circle =>
        circle.id === id ? { ...circle, isClicked: true } : circle
      ));
      setPoints(points + 1);
      setNextExpectedId(nextExpectedId + 1);

      if (points + 1 === circles.length) {
        setGameOver(true);
        setAllCleared(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const handlePlayRestart = () => {
    setPlaying(true);
    setPoints(0);
    setTime(0);
    setCircles(generateCircles(inputPoints));
    setNextExpectedId(1);
    setGameOver(false);
    setAllCleared(false);
  };

  return (
    <div className="App">
      <h2>{gameOver ? (allCleared ? 'ALL CLEARED' : 'GAME OVER') : "LET'S PLAY"}</h2>
      <GameStatus
        points={points}
        time={time}
        inputPoints={inputPoints}
        setInputPoints={setInputPoints}
        playing={playing}
        onPlayRestart={handlePlayRestart}
      />
      <div className="game-board" style={gameBoardStyle}>
        {circles.map(circle => (
          <Circle key={circle.id} {...circle} onClick={() => handleCircleClick(circle.id)} />
        ))}
      </div>
    </div>
  );
}

const generateCircles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    isClicked: false,
  }));
};

const gameBoardStyle = {
  position: 'relative',
  width: '700px',
  height: '500px',
  border: '2px solid black',
  margin: '20px auto',
  overflow: 'hidden',
};

export default App;
