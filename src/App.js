import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import History from "./components/history";
import store from "./store";
import { loadConversions } from "./redux/conversions";
import { loadCurrencies } from "./redux/currencies";


function App() {
  useEffect(() => {
    async function fetchData() {
      await store.dispatch(loadConversions());
      await store.dispatch(loadCurrencies());

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
