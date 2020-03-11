/* eslint-disable react/prop-types */
/**
 *
 * WeatherForeCastComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Div, Li, Span, Img } from '../DataCard/index';

const date = new Date();
const day = date.getDay();

const dayoftheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const WeatherForeCastComponent = ({ onClick, weatherData }) => (
  <Div>
    <br />
    {weatherData.map((data, ind) => (
      <Li
        key={data.dt}
        onClick={ev => {
          ev.preventDefault();
          onClick(data.id);
        }}
      >
        <Link to="/fortheday">
          <Span>{dayoftheWeek[day + ind]}</Span>
          <Span>
            <Img src={`http://openweathermap.org/img/w/${data.icon}.png`} />
          </Span>
          <Span>{data.temp_min}°</Span>
          <Span>{data.temp_max}°</Span>
        </Link>
      </Li>
    ))}
  </Div>
);

// WeatherForeCastComponent.propTypes = {
//   onChange: PropTypes.func,
// };

export default memo(WeatherForeCastComponent);
