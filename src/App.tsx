import clsx from "clsx";
import { GameComponent } from "components/GameComponent/GameComponent";
import { useTimer } from "hooks/common/useTimer";
import { useGameStore } from "hooks/useGameState";

const App = () => {
  const { gameState } = useGameStore();
  const { timer, isActive, startTimer } = useTimer({
    seconds: 60,
  });

  return (
    <div className={clsx("w-screen h-screen")}>
      {isActive ? (
        <div className="h-full">
          <GameComponent time={timer} />
        </div>
      ) : timer !== 0 ? (
        <div>
          <button onClick={startTimer}>Start game</button>
        </div>
      ) : (
        <div>
          <h1>Game over</h1>
          <h2>You scored {gameState.points} points</h2>
        </div>
      )}
    </div>
  );
};

export default App;
