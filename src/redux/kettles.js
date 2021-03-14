import { itemsApi } from '../api/itemsApi';
import {FETCH_KETTLES_START, FETCH_KETTLES_SUCCESS, FETCH_KETTLES_FAILURE, FETCH_KETTLE_BY_ID_SUCCESS, FETCH_KETTLE_BY_ID_START, FETCH_KETTLE_BY_ID_FAILURE} from './actionTypes';


const initialState = {};

const kettles = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_KETTLES_SUCCESS:
      const newValues = payload.reduce((acc, kettle) => {
        acc[kettle.id] = kettle;
        return acc;
      }, {});
      return {
        ...state,
        ...newValues
      };

    case FETCH_KETTLE_BY_ID_SUCCESS:
      return {
        ...state,
        [payload.id]: payload
      }
  
    default:
      return state;
  }
};

export const fecthKettles = () => async (dispatch) => {
  dispatch({
    type: FETCH_KETTLES_START
  });
  try {
    const kettles = await itemsApi.fecthKettles();
    dispatch({
      type: FETCH_KETTLES_SUCCESS,
      payload: kettles,
    })
  } catch (err) {
    dispatch({
      type: FETCH_KETTLES_FAILURE,
      payload: err,
      error: true,
    })
  }
};

export const fetchKettleById = (id) => async (dispatch) => {
  dispatch({type: FETCH_KETTLE_BY_ID_START})

  try {
    const kettle = await itemsApi.fetchKettleById(id);
    dispatch({
      type: FETCH_KETTLE_BY_ID_SUCCESS,
      payload: kettle,
    })
  } catch (error) {
    dispatch({
      type: FETCH_KETTLE_BY_ID_FAILURE,
      payload: error,
      error: true
    })
  }
};

export default kettles;