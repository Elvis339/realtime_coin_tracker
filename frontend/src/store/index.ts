import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import { Persistor } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";

import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["coins"],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

interface StoreType {
  store: Store;
  persistor: Persistor;
}

export default (initialState = {}): StoreType => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
