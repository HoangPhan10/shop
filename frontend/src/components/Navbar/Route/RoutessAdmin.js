import { Switch, Route } from "react-router-dom";
import AccountInfor from "../pages/account/AccountInfor";
import Users from "../pages/admin/users/users";
import Products from './../pages/admin/products/products';
import Orders from "../pages/admin/orders/orders";
function Routess() {
  return (
    <div>
      <Switch>
        <Route path="/account/accountInfor">
          <AccountInfor />
        </Route>
        <Route path="/home">
          <Products />
        </Route>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/product">
          <Products />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </Switch>
    </div>
  );
}

export default Routess;
