import { takeEvery, put, all } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './constants';
// Individual exports for testing
// export function* fetchInitWeatherDataStartSaga() {
//   // See example in containers/HomePage/saga.js
//   try {
//     const url = yield fetch(
//       'http://api.openweathermap.org/data/2.5/forecast?q=Manila&cnt=5&appid=e3a189f56990c616151bb2a3110332bc',
//     );
//     const response = yield url.json();
//     const responseData = [];
//     for (let key in response.list) {
//       responseData.push({
//         time: response.list[key].dt_txt,
//         id: response.list[key].weather[0].id,
//         main: response.list[key].weather[0].main,
//         description: response.list[key].weather[0].description,
//         icon: response.list[key].weather[0].icon,
//       });
//     }
//     yield put(actions.fetchweatherDataSuccess(responseData));
//   } catch (error) {
//     yield put(actions.fetchweatherDataFail(error));
//   }
// }

export function* fetchSearchedCitySaga(action) {
  const dayoftheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  try {
    const url = yield fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        action.city
      }&units=metric&appid=e3a189f56990c616151bb2a3110332bc`,
    );
    const response = yield url.json();
    const responseData = [];
    for (let key in response.list) {
      const checkDay = response.list[key].dt_txt.split(' ');
      console.log('Saga', action.city);

      if (checkDay[1] === '06:00:00') {
        responseData.push({
          date: response.list[key].dt_txt,
          id: response.list[key].dt,
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

export function* fetchSearchedCityByClickSaga(action) {
  const dayoftheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date();
  const tomorrow = date.getDate() + 1;
  const dateTomorrow = (date.getDate() + 1 < 10 ? '0' : '') + tomorrow;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  const currentDate = `${year}-${month}-${dateTomorrow} 00:00:00`;
  try {
    const url = yield fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        action.city
      }&units=metric&cnt=7&appid=e3a189f56990c616151bb2a3110332bc`,
    );
    const response = yield url.json();
    const responseData = [];
    for (let key in response.list) {
      console.log(dayoftheWeek[date.getDay()]);
      console.log('response', response.list[key].dt_txt);
      console.log('Saga', currentDate);
      console.log('date', response.list[key].dt_txt.split(' '));
      if (response.list[key].dt_txt < currentDate) {
        responseData.push({
          date: response.list[key].dt_txt,
          time: response.list[key].dt_txt,
          id: response.list[key].weather[0].id,
          main: response.list[key].weather[0].main,
          description: response.list[key].weather[0].description,
          icon: response.list[key].weather[0].icon,
          temp: response.list[key].main.temp,
          today: dayoftheWeek[date.getDay()],
        });
      }
    }
    yield put(actions.fetchweatherDataSuccess(responseData));
  } catch (error) {
    yield put(actions.fetchweatherDataFail(error));
  }
}

export default function* watchWeather() {
  //yield takeEvery(actionTypes.WEATHER_DATA_INIT, fetchInitWeatherDataStartSaga);
  yield all([
    takeEvery(actionTypes.FETCH_WEATHER_DATA, fetchSearchedCitySaga),
    takeEvery(actionTypes.FETCH_CLICKED_CITY, fetchSearchedCityByClickSaga),
  ]);
}
// export function* watchClickedDay() {
//   yield takeEvery(actionTypes.FETCH_CLICKED_CITY, fetchSearchedCityByClickSaga); //FETCH_CLICKED_CITY
// }
