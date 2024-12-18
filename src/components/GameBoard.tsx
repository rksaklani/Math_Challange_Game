import React, { useState, useEffect } from 'react';
import { Problem, ProgressStats, PowerUp } from '../types/game';
import { generateProblem } from '../utils/mathProblems';
import { calculateAccuracy } from '../utils/gameUtils';
import Header from './Header';
import Stats from './Stats';
import DifficultySelector from './DifficultySelector';
import ProgressModal from './ProgressModal';
import PowerUpBar from './PowerUpBar';

export default function GameBoard() {
  const [gameStart, setGameStart] = useState(false); // Start with starting screen
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [animation, setAnimation] = useState<'correct' | 'incorrect' | null>(null);
  const [powerUps, setPowerUps] = useState({
    timeBonus: { type: 'timeBonus' as const, active: true },
    pointMultiplier: { type: 'pointMultiplier' as const, active: true, multiplier: 2, duration: 3 },
    skipQuestion: { type: 'skipQuestion' as const, active: true }
  });

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      setCurrentProblem(generateProblem(difficulty));
    }
  }, [difficulty, gameOver]);
  // Add this useEffect to reset the time when difficulty changes
useEffect(() => {
  if (gameStart && !gameOver) {
    setTimeLeft(60); // Reset time to 60 seconds
    setCurrentProblem(generateProblem(difficulty)); // Generate a new problem for the new difficulty
  }
}, [difficulty]); // Triggered when difficulty changes


  useEffect(() => {
    if (questionsAnswered > 0 && questionsAnswered % 10 === 0) {
      setShowProgress(true);
      setPowerUps(prev => ({
        timeBonus: { ...prev.timeBonus, active: true },
        pointMultiplier: { ...prev.pointMultiplier, active: true },
        skipQuestion: { ...prev.skipQuestion, active: true }
      }));
    }
  }, [questionsAnswered]);

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentProblem) return;

    setQuestionsAnswered(prev => prev + 1);
    
    if (selectedAnswer === currentProblem.answer) {
      const pointMultiplier = powerUps.pointMultiplier.active ? 2 : 1;
      setScore(prev => prev + (streak + 1) * 10 * pointMultiplier);
      setStreak(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
      setAnimation('correct');
    } else {
      setStreak(0);
      setIncorrectAnswers(prev => prev + 1);
      setAnimation('incorrect');
    }

    setTimeout(() => {
      setAnimation(null);
      setCurrentProblem(generateProblem(difficulty));
    }, 500);
  };

  const handlePowerUp = (type: PowerUp['type']) => {
    switch (type) {
      case 'timeBonus':
        setTimeLeft(prev => prev + 10);
        setPowerUps(prev => ({ ...prev, timeBonus: { ...prev.timeBonus, active: false } }));
        break;
      case 'pointMultiplier':
        setPowerUps(prev => ({ ...prev, pointMultiplier: { ...prev.pointMultiplier, active: false } }));
        break;
      case 'skipQuestion':
        setCurrentProblem(generateProblem(difficulty));
        setPowerUps(prev => ({ ...prev, skipQuestion: { ...prev.skipQuestion, active: false } }));
        break;
    }
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGameOver(false);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCurrentProblem(generateProblem(difficulty));
    setPowerUps({
      timeBonus: { type: 'timeBonus', active: true },
      pointMultiplier: { type: 'pointMultiplier', active: true, multiplier: 2, duration: 3 },
      skipQuestion: { type: 'skipQuestion', active: true }
    });
  };

  const getProgressStats = (): ProgressStats => ({
    totalQuestions: questionsAnswered,
    correct: correctAnswers,
    incorrect: incorrectAnswers,
    accuracy: calculateAccuracy(correctAnswers, questionsAnswered)
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-xl">
        {!gameStart ? (
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold text-gray-800">Welcome to Math AI Game!</h1>
            <p className="mb-8 text-lg text-gray-600">Sharpen your math skills and beat the clock.</p>
            <button
              onClick={() => setGameStart(true)} // Start the game
              className="px-8 py-3 font-semibold text-white transition-colors duration-200 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:scale-105"
            >
              Play
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <Header />
              <Stats timeLeft={timeLeft} score={score} streak={streak} />
            </div>
            {!gameOver ? (
              <>
                <PowerUpBar powerUps={powerUps} onUsePowerUp={handlePowerUp} />
                <div className="mb-8">
                  <DifficultySelector 
                    difficulty={difficulty} 
                    onSelect={setDifficulty} 
                  />
                  <div className={`text-center transform transition-all duration-200 ${
                    animation === 'correct' ? 'scale-110 text-green-500' :
                    animation === 'incorrect' ? 'scale-90 text-red-500' : ''
                  }`}>
                    <h2 className="mb-8 text-4xl font-bold text-gray-800">
                      {currentProblem?.question}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {currentProblem?.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(option)}
                          className="py-4 text-xl font-bold text-indigo-600 transition-all duration-200 transform bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white hover:scale-105"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-800">Game Over!</h2>
                <div className="mb-8 space-y-2">
                  <p className="text-xl text-gray-600">Final Score: {score}</p>
                  <p className="text-lg text-gray-600">
                    Correct Answers: {correctAnswers} / {questionsAnswered}
                  </p>
                  <p className="text-lg text-gray-600">
                    Accuracy: {calculateAccuracy(correctAnswers, questionsAnswered)}%
                  </p>
                </div>
                <button
                  onClick={resetGame}
                  className="px-8 py-3 font-semibold text-white transition-colors duration-200 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:scale-105"
                >
                  Play Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {showProgress && !gameOver && (
        <ProgressModal
          stats={getProgressStats()}
          onClose={() => setShowProgress(false)}
        />
      )}
    </div>
  );
}
