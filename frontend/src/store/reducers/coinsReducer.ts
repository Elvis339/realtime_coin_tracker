import { Coin } from "../../types";
import { Action } from "../actions";
import { CoinTypes } from "../actions/coinActions";

export const coinsReducer = (state: Coin[] = [], action: Action): Coin[] => {
  switch (action.type) {
    case CoinTypes.setCoins: {
      return action.payload;
    }
    //@ts-ignore
    case "CLEAR": {
      return [];
    }
    default:
      return state;
  }
};
