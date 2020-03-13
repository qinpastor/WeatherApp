/* eslint-disable react/prop-types */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { StyledDiv, StyledLi, StyledSpan, StyledImg } from '../DataCard/index';

const WeatherForeCastComponent = ({ weatherData }) => {
  let dayPlusOne = 0;
  const date = new Date();
  const day = date.getDay();
  const dayoftheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return (
    <StyledDiv>
      {weatherData.map((data, ind) => {
        const {
          id,
          icon,
          temp_min: tempMin,
          temp_max: tempMax,
          enteredCity,
        } = data;
        return (
          <Link
            to={{
              pathname: '/hourly',
              state: {
                id,
                enteredCity,
              },
            }}
          >
            <StyledLi key={id}>
              <h1>
                {day + ind > 6
                  ? dayoftheWeek[dayPlusOne++]
                  : dayoftheWeek[day + ind]}
              </h1>
              <StyledSpan>
                <StyledImg
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                />
              </StyledSpan>
              <StyledSpan>{tempMin}°</StyledSpan>
              <StyledSpan>{tempMax}°</StyledSpan>
            </StyledLi>
          </Link>
        );
      })}
    </StyledDiv>
  );
};

export default memo(WeatherForeCastComponent);
