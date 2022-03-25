import { SquareComponent } from "components/SquareComponent/SquareComponent";
import { Level } from "game/types";

type LevelComponentProps = {
  level: Level;
};

export const LevelComponent = ({ level }: LevelComponentProps) => {
  return (
    <div className="flex">
      {level.squares.map((square) => (
        <SquareComponent key={square.id} square={square} />
      ))}
    </div>
  );
};
