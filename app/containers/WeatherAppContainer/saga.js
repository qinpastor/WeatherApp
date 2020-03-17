import { takeEvery, put } from 'redux-saga/effects';
import moment from 'moment';
import { fetchweatherDataSuccess, fetchweatherDataFail } from './actions';
import { FETCH_WEATHER_DATA_ACTION } from './constants';

const d = new Date();
const cHours =
  // moment(d)
  //   .format('HH:mm:ss')
  //   .toString();
  d.getHours();
// const dtime = moment(d).format('HH:mm:ss');
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

const dtime = moment(d).format('HH:mm:ss');

console.log(dtime);

const baseURL = city => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e3a189f56990c616151bb2a3110332bc`;
  return url;
};

export function* fetchSearchedCitySaga(action) {
  try {
    const { city } = action;
    const url = yield fetch(baseURL(city));
    const response = yield url.json();
    const fetchWeatherData = response.list.map(weatherData => {
      const checkDay = weatherData.dt_txt.split(' ');
      return {
        id: checkDay[0],
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        date: checkDay[0],
        time: checkDay[1],
        enteredCity: city,
      };
    });

    const weathers = fetchWeatherData.filter(
      weather => weather.time === timeSlot,
    );
    yield put(fetchweatherDataSuccess(weathers));
  } catch (error) {
    yield put(fetchweatherDataFail(error));
  }
}

export default function* watchWeather() {
  yield takeEvery(FETCH_WEATHER_DATA_ACTION, fetchSearchedCitySaga);
}
