import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./Admin";
import Login from "./Login";
import Registration from "./Registration";
import Start from "./Start";
import Upload from "./Upload";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/admin" component={Admin} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
