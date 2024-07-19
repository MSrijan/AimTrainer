import React, { useState } from 'react';
import './App.css';
import GameComponent from './GameComponent';
import Leaderboard from './Leaderboard';

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTimer, setSelectedTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setMessage('');
  };

  const handleTimerClick = (time) => {
    setSelectedTimer(time);
    setMessage('');
  };

  const handleStartGame = () => {
    if (selectedDifficulty && selectedTimer && username.trim() !== '') {
      setStartGame(true);
    } else {
      if (username.trim() === '') {
        setMessage('Please enter username');
      }
      if (selectedTimer === null) {
        setMessage('Please select time');
      }
      if (selectedDifficulty === null) {
        setMessage('Please select difficulty');
      }
    }
  };

  const handleBackClick = () => {
    setStartGame(false);
    setSelectedDifficulty(null);
    setSelectedTimer(null);
  };
  const handleGameEnd = (score, accuracy) => {
    console.log(score);
    
    const gameResult = {
      username,
      difficulty: selectedDifficulty,
      score,
      time: selectedTimer,
      accuracy,
    };
    console.log(gameResult);
    
    setLeaderboard((prevLeaderboard) => [...prevLeaderboard, gameResult]);
    handleBackClick();
  };

  return (
    <div className="container w-100">
      <h1 className="text-5xl mb-10">Aim Trainer</h1>
      {!startGame ? (
        <>
          <p className="text-2xl">Difficulty</p>
          <div className="flex justify-between border p-5">
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedDifficulty === 'Easy' ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleDifficultySelect('Easy')}
            >
              Easy
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedDifficulty === 'Medium' ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleDifficultySelect('Medium')}
            >
              Medium
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedDifficulty === 'Hard' ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleDifficultySelect('Hard')}
            >
              Hard
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedDifficulty === 'Impossible' ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleDifficultySelect('Impossible')}
            >
              Impossible
            </button>
          </div>
          <p className="text-2xl mt-6">Time</p>
          <div className="flex justify-between border p-5">
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedTimer === 10 ? 'bg-white text-black' : ''
              }`}
              
              onClick={() => handleTimerClick(10)}
            >
              10sec
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedTimer === 30 ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleTimerClick(30)}
            >
              30sec
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedTimer === 60 ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleTimerClick(60)}
            >
              1minute
            </button>
            <button
              className={`px-4 border py-1 rounded-full ${
                selectedTimer === 120 ? 'bg-white text-black' : ''
              }`}
              onClick={() => handleTimerClick(120)}
            >
              2minutes
            </button>
          </div>
          <p className="text-2xl text-red-500">{message}</p>
          <div className="flex flex-col py-5 items-center">
            <label htmlFor="username" className="text-2xl">Enter username</label>
            <input
              className="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="mt-6 bg-black text-white font-bold py-2 px-4 rounded-full border hover:bg-white hover:text-black"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
          <Leaderboard leaderboard={leaderboard} />
        </>
      ) : (
        <GameComponent
          difficulty={selectedDifficulty}
          onBackClick={handleBackClick}
          onGameEnd={handleGameEnd}
          timer={selectedTimer}
          username={username}
        />
      )}
      
    </div>
  );
};

export default App;
