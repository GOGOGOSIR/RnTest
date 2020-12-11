import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const CustomHeaderBar = (props) => {
  const {platform, statusBarHeight} = props;

  const _navigateBack = () => {
    const {navigation} = props;
    navigation.goBack();
  };

  return (
    <View style={styles.customHeader(platform, statusBarHeight)}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={_navigateBack}>
          <Icon name="arrow_left" size={24} color="#3eaf7c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CustomHeaderBar.propTypes = {
  platform: PropTypes.string.isRequired,
  statusBarHeight: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  customHeader: (platform, statusBarHeight) => ({
    position: 'absolute',
    top: platform === 'android' ? 0 : -statusBarHeight,
    left: 0,
    right: 0,
    paddingTop: statusBarHeight,
  }),
  headerWrapper: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
});

export default CustomHeaderBar;
