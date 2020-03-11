/**
 *
 * HomeContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomeContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export function HomeContainer() {
  useInjectReducer({ key: 'homeContainer', reducer });
  useInjectSaga({ key: 'homeContainer', saga });

  return (
    <div>
      <Helmet>
        <title>HomeContainer</title>
        <meta name="description" content="Description of HomeContainer" />
      </Helmet>
    </div>
  );
}

HomeContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeContainer: makeSelectHomeContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeContainer);
