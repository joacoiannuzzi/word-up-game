import { useEffect } from "react";

export const useKeyPress = (onKeyPress: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);
};
