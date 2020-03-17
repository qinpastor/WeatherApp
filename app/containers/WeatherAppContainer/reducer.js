import produce from 'immer';
import {
  WEATHER_DATA_SUCCESS_ACTION,
  WEATHER_DATA_FAIL_ACTION,
  FETCH_HOURLY_DATA_ACTION,
} from './constants';

export const initialState = {
  weather: [],
};

const weatherAppContainerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case WEATHER_DATA_SUCCESS_ACTION:
        // eslint-disable-next-line no-param-reassign
        draft.weather = action.weather;
        break;
      case WEATHER_DATA_FAIL_ACTION:
        // eslint-disable-next-line no-param-reassign
        draft.errorMessage = action.errorMessage;
        break;
      case FETCH_HOURLY_DATA_ACTION:
        // eslint-disable-next-line no-param-reassign
        draft.hourlyData = action.daily;
        break;
      default:
        return state;
    }
  });

export default weatherAppContainerReducer;
