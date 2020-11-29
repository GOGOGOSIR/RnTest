import React from 'react';
import {Text} from 'react-native';
import IconFontMap from './fontMap';
import {String, Number} from '../../utils/type/propTypes';

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

Icon.defaultProps = {
  size: 18,
  color: '#333',
  styleOptions: {},
};
Icon.propTypes = {
  name: String,
  size: Number,
  color: String,
};

export default Icon;
