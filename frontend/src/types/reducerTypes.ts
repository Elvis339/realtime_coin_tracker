export interface Collection<T> {
  [key: string]: T;
}

export type StatusReducerType = {
  [key: string]: boolean;
};

export type ConfigReducerType = {
  currency: string;
};
