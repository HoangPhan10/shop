import { Switch, Route } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import LayoutGeneral from "../pages/accessory/LayoutGeneral";
import Home from "../pages/home/Home";
import Introduce from "../pages/introduce/Introduce";
import Address from "../pages/account/Address";
import Dashboard from "../pages/account/Dashboard";
import AccountInfor from "../pages/account/AccountInfor";
import Dowload from "../pages/account/Dowload";
import Order from "../pages/account/Order";
import DetailOrder from "../pages/account/DetailOrder";
import Singupmobile from "../pages/account/singupmobile";
import ViewCart from "../pages/cart/ViewCart";
import Payment from "../pages/cart/Payment";
import AddCart from "../pages/home/Addcart";
function Routess() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/introduce">
          <Introduce />
        </Route>
        <Route path="/children">
          <LayoutGeneral title="TRẺ EM" />
        </Route>
        <Route path="/women/unisex">
          <LayoutGeneral title="Unisex"/>
        </Route>
        <Route path="/women/vay">
          <LayoutGeneral title="Váy"/>
        </Route>
        <Route path="/women/croptop">
          <LayoutGeneral title="Áo Croptop"/>
        </Route>
        <Route path="/men/unisex">
          <LayoutGeneral title="Unisex"/>
        </Route>
        <Route path="/men/polo">
          <LayoutGeneral title="Polo" />
        </Route>
        <Route path="/men/shirt">
          <LayoutGeneral title="Áo sơ mi"/>
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/account/dashboard">
          <Dashboard />
        </Route>
        <Route path="/account/address">
          <Address />
        </Route>
        <Route path="/account/accountInfor">
          <AccountInfor />
        </Route>
        <Route path="/account/order">
          <Order />
        </Route>
        <Route path="/account/detailOrder">
          <DetailOrder />
        </Route>
        <Route path="/account/dowload">
          <Dowload />
        </Route>
        <Route path="/account/singupmobile">
          <Singupmobile />
        </Route>
        <Route path="/viewcart">
          <ViewCart />
        </Route>
        <Route path="/Cart">
          <AddCart />
        </Route>
        <Route path="/men">
        <LayoutGeneral title="Nam"/>
        </Route>
        <Route path="/women">
        <LayoutGeneral title="Nữ"/>
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
    </div>
  );
}

export default Routess;
