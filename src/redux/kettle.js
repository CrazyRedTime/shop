import {
  FETCH_KETTLE_BY_ID_SUCCESS,
} from './actionTypes'

const initialState = {
  id: null
};

const kettle = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_KETTLE_BY_ID_SUCCESS:
      return {
        ...state,
        id: payload.id
      };
  
    default:
      return state;
  }
};

export default kettle;

