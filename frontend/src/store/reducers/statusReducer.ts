import { IAction, StatusTypes } from "../actions/statusActions";
import { StatusReducerType } from "../../types";

const initialState = {
  [StatusTypes.fetchingCoins]: false,
};

export const statusReducer = (
  state: StatusReducerType = initialState,
  action: IAction
): StatusReducerType => {
  const { type, payload } = action;
  const result: StatusReducerType = {};

  result[type] = payload;

  switch (type) {
    case StatusTypes.fetchingCoins:
      return {
        ...state,
        ...result,
      };
    default:
      return state;
  }
};
