import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Frontend from "../pages/Frontend";
import Backend from "../pages/Backend";
import WebDevelop from "../pages/WebDevelop";
import AppDevelop from "../pages/AppDevelop";
import Ios from "../pages/Ios";
import Android from "../pages/Android";
import Job from "../pages/Job";
import BigCompany from "../pages/BigCompany";
import Startup from "../pages/Startup";
import Lol from "../pages/Lol";
import Rest from "../pages/Rest";

export default function DevRouter() {
  return (
    <div>
      <Switch>
        {/* <Route path="/" exact="true" component={all} /> */}
        <Route path="/frontend" exact={true} component={Frontend} />
        <Route path="/backend" exact={true} component={Backend} />
        <Route path="/web-develop" exact={true} component={WebDevelop} />
        <Route path="/app-develop" exact={true} component={AppDevelop} />
        <Route path="/ios" exact={true} component={Ios} />
        <Route path="/android" exact={true} component={Android} />
        <Route path="/job" exact={true} component={Job} />
        <Route path="/big-company" exact={true} component={BigCompany} />
        <Route path="/startup" exact={true} component={Startup} />
        <Route path="/lol" exact={true} component={Lol} />
        <Route path="/rest" exact={true} component={Rest} />
      </Switch>
    </div>
  );
}
