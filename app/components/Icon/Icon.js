import React from 'react';
import {Text, Animated} from 'react-native';
import IconFontMap from './fontMap';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const {
    isAnimatedElement,
    name,
    size,
    color,
    styleOptions,
    ...othersProps
  } = props;
  const unicode_decimal = IconFontMap(name);
  const styles = {
    fontSize: size,
    color,
    ...styleOptions,
    fontFamily: 'iconfont',
  };
  othersProps.style = styles;
  return isAnimatedElement ? (
    <Animated.Text {...othersProps}>{unicode_decimal}</Animated.Text>
  ) : (
    <Text {...othersProps}>{unicode_decimal}</Text>
  );
};

Icon.propTypes = {
  isAnimatedElement: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  styleOptions: PropTypes.object,
};
Icon.defaultProps = {
  isAnimatedElement: false,
  size: 18,
  color: '#333',
  styleOptions: {},
};

export default Icon;
