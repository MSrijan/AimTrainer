import React, { useEffect, useState, useRef } from 'react';

const GameComponent = (props) => {
  const { difficulty, timer, username, onBackClick, onGameEnd } = props;
  const [currentTimer, setCurrentTimer] = useState(timer);
  const [accuracy, setAccuracy] = useState(100);
  const [score, setScore] = useState(0);
  const [difficultyMessage, setDifficultyMessage] = useState('');
  const [message, setMessage] = useState('');
  const [circleSize, setCircleSize] = useState(10);
  const [circleCoordinate, setCircleCoordinate] = useState(null);

  const accuracyRef = useRef(100);
  const scoreRef = useRef(0);

  const circleClicked = (e) => {
    e.stopPropagation();
    setScore((prevScore) => {
      const newScore = prevScore + 100;
      scoreRef.current = newScore;
      return newScore;
    });
    generateNewCircleCoordinate();
  };

  const containerClicked = () => {
    if (circleCoordinate) {
      setAccuracy((prevAccuracy) => {
        const newAccuracy = Math.max(0, prevAccuracy - 5);
        accuracyRef.current = newAccuracy; 
        return newAccuracy;
      });
    }
  };

  const generateNewCircleCoordinate = () => {
    const top = `${Math.random() * 80}%`;
    const left = `${Math.random() * 80}%`;
    setCircleCoordinate({ top, left });
  };

  useEffect(() => {
    setCurrentTimer(timer);
    setAccuracy(100);
    setScore(0);
    setMessage('');
    accuracyRef.current = 100;
    scoreRef.current = 0;

    const countdown = setInterval(() => {
      setCurrentTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          setMessage('Time up');
          setCircleCoordinate(null);
          if (onGameEnd) onGameEnd(scoreRef.current, accuracyRef.current); 
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    generateNewCircleCoordinate();

    return () => clearInterval(countdown);
  }, [timer, onGameEnd, username, difficulty]);

  useEffect(() => {
    switch (difficulty) {
      case 'Easy':
        setCircleSize(80);
        setDifficultyMessage("You've selected Easy");
        break;
      case 'Medium':
        setCircleSize(60);
        setDifficultyMessage("You've selected Medium");
        break;
      case 'Hard':
        setCircleSize(30);
        setDifficultyMessage("You've selected Hard");
        break;
      case 'Impossible':
        setCircleSize(10);
        setDifficultyMessage("You've selected Impossible");
        break;
      default:
        setCircleSize(10);
        setDifficultyMessage('');
        break;
    }
  }, [difficulty]);

  const handleBackClick = () => {
    if (onBackClick) onBackClick();
  };

  return (
    <>
      <p className='text-3xl'>{difficultyMessage}</p>
      <div className="stats flex justify-between text-2xl">
        <p>Time: {currentTimer} seconds</p>
        <p>Score: {score} points</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
      <div className="container border h-96 relative" onClick={containerClicked}>
        {circleCoordinate && (
          <div
            className="circle bg-white absolute rounded-full"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              top: circleCoordinate.top,
              left: circleCoordinate.left,
            }}
            onClick={circleClicked}
          ></div>
        )}
        <p className='text-3xl'>{message}</p>
      </div>
      <button className='px-4 border py-1 rounded-full text-2xl' onClick={handleBackClick}>Back</button>
    </>
  );
};

export default GameComponent;
