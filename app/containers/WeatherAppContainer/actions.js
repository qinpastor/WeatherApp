import * as actionTypes from './constants';

export const fetchweatherDataSuccess = weather => ({
  type: actionTypes.WEATHER_DATA_SUCCESS,
  weather,
});

export const fetchweatherDataFail = errorMessage => ({
  type: actionTypes.WEATHER_DATA_FAIL,
  errorMessage,
});

export const fetchSearchedCity = city => {
  return {
    type: actionTypes.FETCH_WEATHER_DATA,
    city,
  };
};
