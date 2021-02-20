import { combineReducers } from "redux";
import { DefaultRootState } from "react-redux";
import { Coin, ConfigReducerType, StatusReducerType } from "../../types";
import { statusReducer } from "./statusReducer";
import { coinsReducer } from "./coinsReducer";
import { configReducer } from "./configReducer";

export interface RootState {
  coins: Coin[];
  status: StatusReducerType;
  config: ConfigReducerType;
}

export const reducers = {
  coins: coinsReducer,
  status: statusReducer,
  config: configReducer,
};

export const rootReducer = combineReducers<RootState | DefaultRootState>(
  reducers
);
