import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import History from "./components/history";
import store from "./saga/store/index";
import { getCurrenciesData } from "./saga/reducers/currencies";
import { getConversionsData } from "./saga/reducers/conversions";

function App() {
  useEffect(() => {
    async function fetchData() {
      await store.dispatch(getCurrenciesData());
      await store.dispatch(getConversionsData());
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/history" component={History}></Route>
        <Route path="/home" component={Home}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
