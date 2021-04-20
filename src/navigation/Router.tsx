import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Start from "./Start";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Start} />
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        {/* <Route path="/edit" component={Edit} /> */}
        {/* <Route path="/admin" component={Admin} />  */}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
