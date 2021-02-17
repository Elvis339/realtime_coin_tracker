import { all, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { CoinSagaTypes } from "../actions/coinActions";
import { fetchCoins } from "./coinSaga";

export default function* rootSaga(): SagaIterator {
  yield all([takeLatest(CoinSagaTypes.fetchCoins, fetchCoins)]);
}
