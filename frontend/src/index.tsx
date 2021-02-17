import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "./index.css";

import { PersistGate } from "redux-persist/integration/react";

import createStore from "./store";
import {
  socket,
  SocketContext,
} from "./components/SocketContext/SocketContext";
const { store, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      children={
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      }
    />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
