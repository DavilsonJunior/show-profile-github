import React from 'react';
// import {ActivityIndicator} from 'react-native';
// import PropTypes from 'prop-types';
// import api from '../../services/api';

import {Container} from './styles';

const Repository = ({route}) => {
  console.tron.log(route.params);
  return <Container />;
};

/**
 * 
 * static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };
 */

export default Repository;
