/*
 *
 * WeatherAppContainer actions
 *
 */

import * as actionTypes from './constants';

export const initWeatherData = () => ({
  type: actionTypes.WEATHER_DATA_INIT,
});

export const setWeatherData = weatherData => ({
  type: actionTypes.WEATHER_DATA_START,
  weatherData,
});

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

export const fetchSearchedCityByClick = (id, city) => {
  return {
    type: actionTypes.FETCH_CLICKED_CITY,
    city,
    id,
  };
};
