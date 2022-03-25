import clsx from "clsx";
import { Square } from "game/types";
import { handleOption } from "lib/utils";

type SquareComponentProps = {
  square: Square;
};

export const SquareComponent = ({ square }: SquareComponentProps) => {
  return (
    <div
      className={clsx(
        "w-20 h-20",
        {
          "bg-orange-400": square.isUp,
          "bg-gray-200": !square.isUp,
        },
        "flex justify-center items-center",
        "capitalize"
      )}
    >
      {handleOption(square.letter, {
        Some: (letter) => letter,
        None: () => "",
      })}
    </div>
  );
};
