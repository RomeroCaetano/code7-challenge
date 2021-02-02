import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateDebt from "./CreateDebt";
import Debts from "./Debts";
import EditDebt from "./EditDebt";
import AppSider from "./Sider";

const User: React.FC = () => {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${match.path}/:id`}>
          <AppSider content={<Debts />}></AppSider>
        </Route>
        <Route exact path={`${match.path}/:id/create`}>
          <AppSider content={<CreateDebt />}></AppSider>
        </Route>
        <Route exact path={`${match.path}/:id/edit/:debtId`}>
          <AppSider content={<EditDebt />}></AppSider>
        </Route>
        <Route path={`${match.path}`}>Select User</Route>
      </Switch>
    </>
  );
};
export default User;
