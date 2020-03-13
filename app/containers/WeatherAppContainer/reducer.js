/*
 *
 * WeatherAppContainer reducer
 *
 */
import produce from 'immer';
import * as actionTypes from './constants';
export const initialState = {
  weather: [],
};

const weatherAppContainerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.WEATHER_DATA_START:
        // eslint-disable-next-line no-param-reassign
        draft.state = '';
        break;
      case actionTypes.WEATHER_DATA_SUCCESS:
        // eslint-disable-next-line no-param-reassign
        draft.weather = action.weather;
        break;
      case actionTypes.WEATHER_DATA_FAIL:
        // eslint-disable-next-line no-param-reassign
        draft.errorMessage = action.errorMessage;
        break;
      case actionTypes.FETCH_HOURLY_DATA:
        // eslint-disable-next-line no-param-reassign
        draft.hourlyData = action.daily;
        break;
      default:
        return state;
    }
  });

export default weatherAppContainerReducer;
