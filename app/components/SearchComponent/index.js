/**
 *
 * SearchComponent
 *
 */

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
// import styled from 'styled-components';

const SearchComponent = ({ onChange }) => (
  <div>
    Location:
    <input placeholder="Search a city here" onChange={onChange} />
    <Button type="primary" htmlType="submit">
      Generate
    </Button>
  </div>
);

SearchComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchComponent;
