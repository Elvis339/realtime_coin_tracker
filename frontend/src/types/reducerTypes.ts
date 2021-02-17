export interface Collection<T> {
  [key: number]: T;
  [key: string]: T;
}

export type StatusReducerType = {
  [key: string]: boolean;
};
