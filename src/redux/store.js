import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import kettles from "./kettles";
import kettlesPage from "./kettlesPage";
import kettle from './kettle';
import cart from './cart';
import checkout from "./checkout";

const reducers = combineReducers({
  kettles,
  kettlesPage,
  kettle,
  cart,
  checkout
  }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;