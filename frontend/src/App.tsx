import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppSider from "./components/Sider";
import User from "./components/User";
const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/">
        <AppSider />
      </Route>
      <Route path="/user">
        <User />
      </Route>
    </Router>
  );
};

export default App;
