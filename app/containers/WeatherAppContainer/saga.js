import { takeEvery, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './constants';
const d = new Date();
const cHours = d.getHours();
let timeSlot = '';
if (cHours >= 0 && cHours < 3) {
  timeSlot = '00:00:00';
} else if (cHours >= 3 && cHours < 6) {
  timeSlot = '03:00:00';
} else if (cHours >= 6 && cHours < 9) {
  timeSlot = '06:00:00';
} else if (cHours >= 9 && cHours < 12) {
  timeSlot = '09:00:00';
} else if (cHours >= 12 && cHours < 15) {
  timeSlot = '12:00:00';
} else if (cHours >= 15 && cHours < 18) {
  timeSlot = '15:00:00';
} else if (cHours >= 18 && cHours < 21) {
  timeSlot = '18:00:00';
} else if (cHours >= 21) {
  timeSlot = '21:00:00';
}

export function* fetchSearchedCitySaga(action) {
  try {
    const { city } = action;
    const url = yield fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e3a189f56990c616151bb2a3110332bc`,
    );
    const response = yield url.json();
    const fetchWeatherData = [];
    response.list.map(weatherData => {
      const checkDay = weatherData.dt_txt.split(' ');
      fetchWeatherData.push({
        id: checkDay[0],
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        date: checkDay[0],
        time: checkDay[1],
        enteredCity: city,
      });
    });

    const weathers = fetchWeatherData.filter(
      weather => weather.time === timeSlot,
    );
    yield put(actions.fetchweatherDataSuccess(weathers));
  } catch (error) {
    yield put(actions.fetchweatherDataFail(error));
  }
}

export default function* watchWeather() {
  yield takeEvery(actionTypes.FETCH_WEATHER_DATA, fetchSearchedCitySaga);
}
