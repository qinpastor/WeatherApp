import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import PropTypes from 'prop-types';
import {
  makeSelectWeatherAppContainer,
  makeSelectCitySearch,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Search from '../../components/SearchComponent/index';
import WeatherForeCastComponent from '../../components/WeatherForeCastComponent/index';
import { fetchSearchedCity } from './actions';
import Body from '../../components/Background';
import { StyledInput } from '../../components/DataCard/index';

export function WeatherAppContainer(props) {
  useInjectReducer({ key: 'weatherAppContainer', reducer });
  useInjectSaga({ key: 'weatherAppContainer', saga });

  const [userEnteredCity, setUserEnteredCity] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onfetchSearchedCity(userEnteredCity);
  };

  return (
    <Body>
      <Helmet>
        <title>WeatherAppContainer</title>
        <meta name="description" content="Description of WeatherAppContainer" />
      </Helmet>
      Welcome to {userEnteredCity}
      <StyledInput>
        <form onSubmit={submitHandler}>
          <Search
            type="text"
            value={userEnteredCity}
            onChange={event => {
              setUserEnteredCity(event.target.value);
            }}
          />
        </form>
      </StyledInput>
      <WeatherForeCastComponent
        weatherData={props.weatherAppContainer.weather}
      />
    </Body>
  );
}

WeatherAppContainer.propTypes = {
  weatherAppContainer: PropTypes.object,
  onfetchSearchedCity: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  weatherAppContainer: makeSelectWeatherAppContainer(),
  city: makeSelectCitySearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    onfetchSearchedCity: enteredCity =>
      dispatch(fetchSearchedCity(enteredCity)),
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
