import { Coin } from "../../types";
import { CoinRequestParams } from "../../services";

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
  params: CoinRequestParams;
}
export const sagaFetchCoinsAction = (
  params: CoinRequestParams
): SagaFetchCoinsAction => ({
  type: CoinSagaTypes.fetchCoins,
  params,
});

export type CoinActions = SetCoinsAction;
