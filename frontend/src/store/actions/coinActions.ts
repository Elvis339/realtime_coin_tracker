import { Coin } from "../../types";

export enum CoinTypes {
  setCoins = "SET_COINS",
}

export enum CoinSagaTypes {
  fetchCoins = "SAGA_FETCH_COINS",
}

export interface SetCoinsAction {
  type: CoinTypes.setCoins;
  payload: Coin[];
}
export const setCoinAction = (payload: Coin[]): SetCoinsAction => ({
  type: CoinTypes.setCoins,
  payload,
});

export interface SagaFetchCoinsAction {
  type: CoinSagaTypes.fetchCoins;
}
export const sagaFetchCoinsAction = (): SagaFetchCoinsAction => ({
  type: CoinSagaTypes.fetchCoins,
});

export type CoinActions = SetCoinsAction;
