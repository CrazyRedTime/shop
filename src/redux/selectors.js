import { createSelector } from "reselect";

export const getKettleById = (state, id) => {
  return state.kettles[id]
};

export const getKettles = (state) => {

  const kettles = state.kettlesPage.ids
    .map((id) => {
      return getKettleById(state, id)
    })
    .filter((kettle) =>
      kettle.name.toLowerCase().includes(state.kettlesPage.search.toLowerCase()))
    // .sort((a, b) => {
    //   if (a.price > b.price) {
    //     return 1;
    //   }
    //   if (a.price < b.price) {
    //     return -1;
    //   }
      
    //   return 0;
    // })
   
  if (state.kettlesPage.activeCategory) {
    return kettles.filter(kettle => kettle.category === state.kettlesPage.activeCategory)
  }

  return kettles;
};

const getCart = (state) => {;
  return state.cart;
};

export const getKettlesInCartCount = createSelector(
  [getCart],
  cart => cart.length
);

export const getCartPrice = (state) => {
  const totalPrice = state.cart.map(id => getKettleById(state, id))
  .map(kettle => kettle.price)
  .reduce((acc, price) => {
    acc += price;
    return acc
  }, 0);

  return totalPrice;
};

export const getCartItems = (state) => {
  const uniqIds = [...new Set(state.cart)];

  const getCount = (state, id) => {
    return state.cart.filter(cartId => id === cartId).length;
  };

  const kettlessWithCount = uniqIds.map(id => getKettleById(state, id))
  .map(kettle => {
    return {
      ...kettle,
      count: getCount(state, kettle.id)
    }
  })

  return kettlessWithCount;
}

export const getCategories = (state) => {
  const categotries =  Object.values(state.kettles).map(kettle => kettle.category);
  const uniqCategoires = [...new Set(categotries)].sort();
  return uniqCategoires;
};

export const getCustomerData = (state) => {
  return state.checkout.customerData
} 

export const getAddress = (state) => {
  return state.checkout.address
};

export const getDataState = (state) => {
  return state.checkout.customerData.isSubmitted
};

export const getAddressState = (state) => {
  return state.checkout.address.isSubmitted
}