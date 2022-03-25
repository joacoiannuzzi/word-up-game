export type Option<T> = T | undefined;

export const handleOption = <T, ReturnType>(
  option: Option<T>,
  {
    None,
    Some,
  }: {
    None: () => ReturnType;
    Some: (value: T) => ReturnType;
  }
): ReturnType => {
  if (option === undefined) {
    return None();
  }
  return Some(option);
};

export const isNone = <T>(option: Option<T>): boolean => option === undefined;
export const isSome = <T>(option: Option<T>): boolean => option !== undefined;
