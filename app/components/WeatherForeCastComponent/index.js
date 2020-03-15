/* eslint-disable react/prop-types */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { StyledDiv, StyledLi, StyledSpan, StyledImg } from '../DataCard/index';

const WeatherForeCastComponent = ({ weatherData }) => {
  const fullDate = new Date();
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
        const date = moment(fullDate, 'YYYY-MM-DD HH:mm:ss').add(ind, 'days');
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
              <h1>{date.format('dddd')}</h1>
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
