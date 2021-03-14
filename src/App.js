import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Address from "./components/Checkout/Address/Address";
import CustomerData from "./components/Checkout/CustomerData/CustomerData";
import OrderIsComplete from "./components/Checkout/OrderIsComplete/OrderIsComplete";
import Paying from "./components/Checkout/Paying/Paying";
import Header from "./components/Header/Header";
import Kette from "./components/Kettle/Kettle";
import KettlesPage from "./components/KettlesPage/KettlesPage";
import Whoops from "./components/Whoops/Whoops";

const App = () => {
  return (
    <div className={"wrapper"}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/kettles" />
        </Route>
        <Route exact path="/kettles/:category?" component={KettlesPage} />
        <Route path="/kettle/:id" component={Kette} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CustomerData} />
        <Route path="/address_confirmation" component={Address} />
        <Route path="/payment" component={Paying} />
        <Route path="/complete" component={OrderIsComplete} />
        <Route path="*" component={Whoops} />
      </Switch>
    </div>
  );
};

export default App;
