import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectWeatherAppContainer,
  makeSelectCitySearch,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Search from '../../components/SearchComponent/index';
import WeatherForeCastComponent from '../../components/WeatherForeCastComponent/index';
import * as actions from './actions';
import Body from '../../components/Background';

export function WeatherAppContainer(props) {
  useInjectReducer({ key: 'weatherAppContainer', reducer });
  useInjectSaga({ key: 'weatherAppContainer', saga });

  const [userEnteredCity, setUserEnteredCity] = useState('');

  const [isRendered, setIsRendered] = useState({ loading: false });

  const submitHandler = event => {
    event.preventDefault();
    setIsRendered({ loading: true });
    props.onfetchSearchedCity(userEnteredCity);
  };

  useEffect(() => {
    setIsRendered({ loading: false });
  }, []);

  return (
    <Body>
      <Helmet>
        <title>WeatherAppContainer</title>
        <meta name="description" content="Description of WeatherAppContainer" />
      </Helmet>
      Welcome to {userEnteredCity}
      <form onSubmit={submitHandler}>
        <Search
          type="text"
          value={userEnteredCity}
          onChange={event => {
            setUserEnteredCity(event.target.value);
          }}
        />
      </form>
      {isRendered && (
        <WeatherForeCastComponent
          weatherData={props.weatherAppContainer.weather}
        />
      )}
    </Body>
  );
}

const mapStateToProps = createStructuredSelector({
  weatherAppContainer: makeSelectWeatherAppContainer(),
  city: makeSelectCitySearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    onfetchSearchedCity: enteredCity =>
      dispatch(actions.fetchSearchedCity(enteredCity)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WeatherAppContainer);
