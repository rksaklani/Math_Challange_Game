export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return (correct / total) * 100;
};

export const formatAccuracy = (accuracy: number): string => {
  return `${Math.round(accuracy)}%`;
};