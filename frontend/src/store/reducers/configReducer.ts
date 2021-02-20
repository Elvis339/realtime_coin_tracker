import { ConfigReducerType } from "../../types";
import { Action } from "../actions";
import { ConfigTypes } from "../actions/configActions";

const initialState = {
  currency: "usd",
};

export const configReducer = (
  state: ConfigReducerType = initialState,
  action: Action
): ConfigReducerType => {
  switch (action.type) {
    case ConfigTypes.setConfig: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
