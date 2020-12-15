import React, {useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../components/Icon/Icon';

let isDarkStatus = false;

const AnimateHeaderBar = (props) => {
  const {statusBarHeight, scrolledY, targetOffset} = props;

  const bgColor = scrolledY.interpolate({
    inputRange: [0, targetOffset],
    outputRange: ['rgba(255,255,255, 0)', 'rgba(255,255,255, 1.0)'],
    extrapolate: 'clamp',
  });
  const IconWrapperBgColor = scrolledY.interpolate({
    inputRange: [0, targetOffset],
    outputRange: ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)'],
    extrapolate: 'clamp',
  });
  const IconColor = scrolledY.interpolate({
    inputRange: [0, targetOffset],
    outputRange: ['#fff', '#333'],
    extrapolate: 'clamp',
  });
  const titleOpacity = scrolledY.interpolate({
    inputRange: [0, targetOffset],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    scrolledY.addListener((info) => {
      const {value: scrollY} = info;
      if (scrollY > 30 && !isDarkStatus) {
        StatusBar.setBarStyle('dark-content');
        isDarkStatus = true;
        console.log('dark-content');
      } else if (scrollY <= 30 && isDarkStatus) {
        StatusBar.setBarStyle('light-content');
        isDarkStatus = false;
        console.log('light-content');
      }
    });
  }, [scrolledY]);

  const _navigateBack = () => {
    const {navigation} = props;
    navigation && navigation.goBack();
  };

  return (
    <Animated.View
      style={[
        styles.headerWrapper(statusBarHeight),
        {
          backgroundColor: bgColor,
        },
      ]}>
      <View style={styles.headerMainWrapper}>
        <TouchableOpacity style={styles.iconPress} onPress={_navigateBack}>
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: IconWrapperBgColor,
              },
            ]}>
            <Icon
              isAnimatedElement={true}
              name="arrow_left"
              size={24}
              color={IconColor}
            />
          </Animated.View>
        </TouchableOpacity>
        <Animated.Text
          style={[
            styles.headerBarTitle,
            {
              opacity: titleOpacity,
            },
          ]}>
          我是标题
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

AnimateHeaderBar.propTypes = {
  scrolledY: PropTypes.any,
  targetOffset: PropTypes.number,
};

AnimateHeaderBar.defaultProps = {
  scrolledY: new Animated.Value(0),
  targetOffset: 100,
};

const styles = StyleSheet.create({
  headerWrapper: (statusBarHeight) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: statusBarHeight,
    zIndex: 100,
  }),
  headerMainWrapper: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconPress: {
    position: 'absolute',
    left: 10,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarTitle: {
    fontSize: 14,
    color: '#333',
  },
});

export default AnimateHeaderBar;
