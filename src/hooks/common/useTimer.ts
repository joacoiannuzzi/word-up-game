import { useEffect, useState } from "react";
import { Option } from "lib/utils";

export const useTimer = ({
  seconds,
  onFinish,
}: {
  seconds: number;
  onFinish?: () => void;
}) => {
  const [timer, setTimer] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => {
    setIsActive(true);
    setTimer(seconds);
  };

  useEffect(() => {
    let interval: Option<number> = undefined;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsActive(false);
      onFinish?.();
    }
  }, [timer]);

  return { timer, isActive, startTimer };
};
