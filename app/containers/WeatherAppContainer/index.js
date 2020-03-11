/**
 *
 * WeatherAppContainer
 *
 */

import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
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

  const submitHandler = event => {
    event.preventDefault();
    props.onfetchSearchedCity(userEnteredCity);
  };

  const clickDataHandler = id => {
    props.onclickDataHandler(id, userEnteredCity);
  };

  return (
    <Body>
      <Helmet>
        <title>WeatherAppContainer</title>
        <meta name="description" content="Description of WeatherAppContainer" />
      </Helmet>
      Welcome
      <form onSubmit={submitHandler}>
        <Search
          type="text"
          value={userEnteredCity}
          onChange={event => {
            setUserEnteredCity(event.target.value);
          }}
        />
      </form>
      <Link to={'/signup'}>
        <WeatherForeCastComponent
          weatherData={props.weatherAppContainer}
          onClick={id => {
            clickDataHandler(id);
          }}
          // onClick={id => {
          //   setClickedDay(id);
        />
      </Link>
    </Body>
  );
}

// WeatherAppContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  weatherAppContainer: makeSelectWeatherAppContainer(),
  city: makeSelectCitySearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    onfetchSearchedCity: enteredCity =>
      dispatch(actions.fetchSearchedCity(enteredCity)),
    onclickDataHandler: (clickedDay, userEnteredCity) =>
      dispatch(actions.fetchSearchedCityByClick(clickedDay, userEnteredCity)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(WeatherAppContainer);
