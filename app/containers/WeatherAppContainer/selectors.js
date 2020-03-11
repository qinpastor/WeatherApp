import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the weatherAppContainer state domain
 */

const selectWeatherAppContainerDomain = state =>
  state.weatherAppContainer || initialState;

const makeSelectWeatherAppContainer = () =>
  createSelector(
    selectWeatherAppContainerDomain,
    substate => substate.weather,
  );

const makeSelectCitySearch = () =>
  createSelector(
    selectWeatherAppContainerDomain,
    substate => substate.enteredCity,
  );

export { makeSelectWeatherAppContainer, makeSelectCitySearch };
export { selectWeatherAppContainerDomain };
