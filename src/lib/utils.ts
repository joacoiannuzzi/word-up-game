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
): ReturnType => (isNone(option) ? None() : Some(option));

export const isNone = <T>(option: Option<T>): option is undefined =>
  option === undefined;
export const isSome = <T>(option: Option<T>): option is T =>
  option !== undefined;

export const ifElse = <ReturnType>(
  condition: boolean,
  {
    True,
    False,
  }: {
    True: () => ReturnType;
    False: () => ReturnType;
  }
) => (condition ? True() : False());
