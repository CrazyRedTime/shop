import {
  CHANGE_CATEGORY,
  CHANGE_SEARCH_VALUE,
  FETCH_KETTLES_SUCCESS,
} from "./actionTypes";

const InitialState = {
  ids: [],
  search: "",
  activeCategory: null,
};

const kettlesPage = (state = InitialState, { type, payload }) => {
  switch (type) {
    case FETCH_KETTLES_SUCCESS:
      return {
        ...state,
        ids: payload.map((kettle) => kettle.id),
      };

    case CHANGE_CATEGORY:
      return {
        ...state,
        activeCategory: payload,
      };

      case CHANGE_SEARCH_VALUE:
        return {
          ...state,
          search: payload,
        };

    default:
      return state;
  }
};

export default kettlesPage;

export const changeCategory = (category) => (dispatch) => {
  const newCategory = category ? category : null;
  dispatch({
    type: CHANGE_CATEGORY,
    payload: newCategory,
  });
};

export const searchKettle = (value) => (dispatch) => {
  dispatch({
    type: CHANGE_SEARCH_VALUE,
    payload: value
  });
};
