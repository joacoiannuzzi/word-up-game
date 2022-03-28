import clsx from "clsx";
import { GridComponent } from "components/GridComponent/GridComponent";
import { PointsComponent } from "components/PointsComponent/PointsComponent";
import { useAddLetter, useRemoveLetter } from "hooks/game/keys";

export const GameComponent = ({ time }: { time: number }) => {
  useAddLetter();
  useRemoveLetter();

  return (
    <div
      className={clsx(
        "h-full",
        "flex flex-col-reverse justify-center items-center gap-3"
      )}
    >
      <GridComponent />
      <div className={clsx("w-full", "p-3", "flex justify-between")}>
        <PointsComponent />
        <div>
          <h1>{time}</h1>
        </div>
      </div>
    </div>
  );
};
