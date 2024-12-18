export interface Problem {
  question: string;
  answer: number;
  options: number[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PowerUp {
  type: 'timeBonus' | 'pointMultiplier' | 'skipQuestion';
  active: boolean;
  duration?: number;
  multiplier?: number;
}

export interface GameState {
  score: number;
  currentProblem: Problem | null;
  gameOver: boolean;
  streak: number;
  timeLeft: number;
  questionsAnswered: number;
  correctAnswers: number;
  incorrectAnswers: number;
  powerUps: {
    timeBonus: PowerUp;
    pointMultiplier: PowerUp;
    skipQuestion: PowerUp;
  };
}

export interface ProgressStats {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  accuracy: number;
}