export const generateProblem = (difficulty: 'easy' | 'medium' | 'hard'): Problem => {
  const operations = ['+', '-', '*'];
  let num1: number, num2: number;
  
  switch(difficulty) {
    case 'easy':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 'medium':
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 20) + 10;
      break;
    case 'hard':
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 50) + 20;
      break;
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];
  let answer: number;
  
  switch(operation) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    default:
      answer = num1 + num2;
  }

  const options = [
    answer,
    answer + Math.floor(Math.random() * 10) + 1,
    answer - Math.floor(Math.random() * 10) - 1,
    answer * 2
  ].sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer,
    options,
    difficulty
  };
};