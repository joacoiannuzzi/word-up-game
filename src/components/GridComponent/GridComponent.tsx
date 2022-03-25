import { LevelComponent } from "components/LevelComponent/LevelComponent";
import { Level } from "game/types";

type GridComponentProps = {
  levels: Level[];
};

export const GridComponent = ({ levels }: GridComponentProps) => {
  return (
    <div className="flex flex-col-reverse">
      {levels.map((level) => (
        <LevelComponent key={level.id} level={level} />
      ))}
    </div>
  );
};
