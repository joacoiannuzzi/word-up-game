import clsx from "clsx";
import { GridComponent } from "components/GridComponent/GridComponent";
import { useAddLetter, useRemoveLetter } from "hooks/game/keys";
import { useGameStore } from "hooks/useGameState";

const App = () => {
  const { gameState } = useGameStore();
  useAddLetter();
  useRemoveLetter();

  return (
    <div className={clsx("w-screen h-screen", "flex justify-center items-end")}>
      <GridComponent levels={gameState.levels} />
    </div>
  );
};

export default App;
