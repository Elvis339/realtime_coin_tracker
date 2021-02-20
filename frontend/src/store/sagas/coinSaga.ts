import { call, put } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { SagaFetchCoinsAction, setCoinAction } from "../actions/coinActions";
import { CoinService } from "../../services";
import { setStatusAction, StatusTypes } from "../actions/statusActions";

export function* fetchCoins(action: SagaFetchCoinsAction): SagaIterator<void> {
  yield put(setStatusAction(StatusTypes.fetchingCoins, true));
  try {
    const response = yield call(CoinService.fetchCoins, action.params);
    yield put(setCoinAction(response));
  } catch (error) {
    alert("Error happened, reloading...");
    window.location.reload();
  } finally {
    yield put(setStatusAction(StatusTypes.fetchingCoins, false));
  }
}
