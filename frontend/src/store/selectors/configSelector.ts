import { createSelector } from "reselect";
import { RootState } from "../reducers/rootReducer";
import { ConfigReducerType } from "../../types";

export const getConfigByKey = createSelector(
  (state: RootState) => state.config,
  (state: RootState, key: keyof ConfigReducerType) => key,
  (state, key) => state[key]
);
