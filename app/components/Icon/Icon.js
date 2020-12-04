import React from 'react';
import {Text} from 'react-native';
import IconFontMap from './fontMap';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const {name, size, color, styleOptions, ...othersProps} = props;
  const unicode_decimal = IconFontMap(name);
  const styles = {
    fontSize: size,
    color,
    ...styleOptions,
    fontFamily: 'iconfont',
  };
  othersProps.style = styles;
  return <Text {...othersProps}>{unicode_decimal}</Text>;
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};
Icon.defaultProps = {
  size: 18,
  color: '#333',
  styleOptions: {},
};

export default Icon;
