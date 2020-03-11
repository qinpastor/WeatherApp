/**
 *
 * CurrentHeaderComponent
 *
 */

import React, { memo } from 'react';
import H3 from '../H3/index';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CurrentHeaderComponent() {
  return (
    <div>
      <H3>Welcome!</H3>
    </div>
  );
}

CurrentHeaderComponent.propTypes = {};

export default memo(CurrentHeaderComponent);
