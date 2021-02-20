import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, SingleCoin } from "./pages";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path={"/"} component={Dashboard} />
        <Route path={"/coin/:id"} component={SingleCoin} />
      </Switch>
    </Router>
  );
};

export default App;
