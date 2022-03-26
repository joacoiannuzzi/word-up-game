import clsx from "clsx";
import { GridComponent } from "components/GridComponent/GridComponent";
import { useAddLetter, useRemoveLetter } from "hooks/game/keys";
import { useGameStore } from "hooks/useGameState";

const App = () => {
  useAddLetter();
  useRemoveLetter();

  return (
    <div
      className={clsx("w-screen h-screen", "flex justify-center items-center")}
    >
      <GridComponent />
    </div>
  );
};

export default App;
