import * as actionTypes from './constants';

export const fetchweatherDataSuccess = weather => ({
  type: actionTypes.WEATHER_DATA_SUCCESS_ACTION,
  weather,
});

export const fetchweatherDataFail = errorMessage => ({
  type: actionTypes.WEATHER_DATA_FAIL_ACTION,
  errorMessage,
});

export const fetchSearchedCity = city => {
  return {
    type: actionTypes.FETCH_WEATHER_DATA_ACTION,
    city,
  };
};
