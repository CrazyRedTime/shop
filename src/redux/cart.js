import {
  ADD_KETTLE_TO_CART,
  CHANGE_KETTLE_COUNT_IN_CART,
  DELETE_KETTLE_FROM_CART,
  CLEAR_CART
} from "./actionTypes";

const initialState = [];

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_KETTLE_TO_CART:
      return [...state, payload];

    case DELETE_KETTLE_FROM_CART:
      return state.filter((id) => payload !== id);

    case CHANGE_KETTLE_COUNT_IN_CART:
      const getCount = (state, id) => {
        return state.filter((cartId) => id === cartId).length;
      };
      const currentCount = getCount(state, payload.id);
      if (payload.newCount > currentCount) {
        return [...state, payload.id];
      }
      if (payload.newCount < currentCount) {
        const indexOfId = state.indexOf(payload.id);
        const copyOftate = [...state];
        copyOftate.splice(indexOfId, 1);
        return copyOftate;
      }
      return state;
    
    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

export const addKettleToCart = (id) => (dispatch) => {
  dispatch({
    type: ADD_KETTLE_TO_CART,
    payload: id,
  });
};

export const deleteKettleFromCart = (id) => (dispatch) => {
  dispatch({
    type: DELETE_KETTLE_FROM_CART,
    payload: id,
  });
};

export const changeKettleCountInCart = (id, newCount) => (dispatch) => {
  dispatch({
    type: CHANGE_KETTLE_COUNT_IN_CART,
    payload: {
      id: id,
      newCount: newCount,
    },
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART
  })
};

export default cart;
