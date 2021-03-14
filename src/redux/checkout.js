import { UPDATE_ADDRESS, UPDATE_CUSTOMER_DATA } from "./actionTypes";

const initialValue = {
  customerData: {
    firstName: "",
    lastName: "",
    phone: "",
    isSubmitted: false
  },
  address: {
    city: "",
    street: "",
    houseNumber: "",
    buildingNumber: "",
    apartmentNumber: "",
    isSubmitted: false
  }
};

const checkout = (state = initialValue, { type, payload }) => {
  switch (type) {
    case UPDATE_CUSTOMER_DATA:
      return {
        ...state,
        customerData: payload,
      };

      case UPDATE_ADDRESS:
        return {
          ...state,
          address: payload,
        };

    default:
      return state;
  }
};

export const updateCustomerData = (data)  => (dispatch) => {
  const fixedData = {
    ...data,
    isSubmitted: true
  }
  dispatch({
    type: UPDATE_CUSTOMER_DATA,
    payload: fixedData
  });
};

export const updateAddress = (address)  => (dispatch) => {
  const fixedAddress = {
    ...address,
    isSubmitted: true
  }
  dispatch({
    type: UPDATE_ADDRESS,
    payload: fixedAddress
  });
};

export default checkout;