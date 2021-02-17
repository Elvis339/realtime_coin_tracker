import { createSelector } from "reselect";
import { RootState } from "../reducers/rootReducer";
import { StatusTypes } from "../actions/statusActions";

export const getStatus = createSelector(
  (state: RootState) => state.status,
  (state: RootState, key: StatusTypes) => key,
  (status, key) => status[key]
);
