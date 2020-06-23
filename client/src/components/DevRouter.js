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
import SmartStore from "../pages/SmartStore";
import Coupang from "../pages/Coupang";
import Amazon from "../pages/Amazon";
import Pdf from "../pages/Pdf";
import Ten from "../pages/Ten";
import Hundred from "../pages/Hundred";
import Thousand from "../pages/Thousand";
export default function DevRouter() {
  return (
    <div>
      <Switch>
        {/* <Route path="/" exact="true" component={all} /> */}
        {/* <Route path="/smartstore" exact={true} component={SmartStore} />
        <Route path="/coupang" exact={true} component={Coupang} />
        <Route path="/amazon" exact={true} component={Amazon} />
        <Route path="/pdf" exact={true} component={Pdf} />
        <Route path="/ten" exact={true} component={Ten} />
        <Route path="/hundred" exact={true} component={Hundred} />
        <Route path="/thousand" exact={true} component={Thousand} /> */}
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
