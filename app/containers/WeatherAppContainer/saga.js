import { takeEvery, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './constants';

export function* fetchSearchedCitySaga(action) {
  const { city } = action;
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
  try {
    const url = yield fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e3a189f56990c616151bb2a3110332bc`,
    );
    const response = yield url.json();
    const responseData = [];
    for (let key in response.list) {
      const checkDay = response.list[key].dt_txt.split(' ');
      if (checkDay[1] === timeSlot) {
        responseData.push({
          id: checkDay[0],
          date: response.list[key].dt_txt,
          main: response.list[key].weather[0].main,
          description: response.list[key].weather[0].description,
          icon: response.list[key].weather[0].icon,
          temp_min: response.list[key].main.temp_min,
          temp_max: response.list[key].main.temp_max,
          enteredCity: action.city,
        });
      }
    }
    yield put(actions.fetchweatherDataSuccess(responseData));
  } catch (error) {
    yield put(actions.fetchweatherDataFail(error));
  }
}

export default function* watchWeather() {
  yield takeEvery(actionTypes.FETCH_WEATHER_DATA, fetchSearchedCitySaga);
}
