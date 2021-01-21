import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import History from "./components/history";
import store from "./store";
import { loadConversions } from "./redux/conversions";
import { loadCurrencies } from "./redux/currencies";
import AdminHome from "./components/adminComponents/adminHome";
import {
  AdminUpdateRoutes,
  AdminCreateRoutes,
} from "./admin/routes/adminRoutes";

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
        {AdminUpdateRoutes} {AdminCreateRoutes}
        <Route path="/admin" component={AdminHome}></Route>
        <Route path="/history" component={History}></Route>
        <Route path="/home" component={Home}></Route>
        <Redirect from="/" exact to="/home"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
