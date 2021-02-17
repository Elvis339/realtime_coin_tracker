import { combineReducers } from "redux";
import { DefaultRootState } from "react-redux";
import { Coin, StatusReducerType } from "../../types";
import { statusReducer } from "./statusReducer";
import { coinsReducer } from "./coinsReducer";

export interface RootState {
  coins: Coin[];
  status: StatusReducerType;
}

export const reducers = {
  coins: coinsReducer,
  status: statusReducer,
};

export const rootReducer = combineReducers<RootState | DefaultRootState>(
  reducers
);
