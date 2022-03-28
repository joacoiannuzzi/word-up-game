import { useGameStore } from "hooks/useGameState";

export const PointsComponent = () => {
  const { gameState } = useGameStore();
  return <div> Points: {gameState.points}</div>;
};
