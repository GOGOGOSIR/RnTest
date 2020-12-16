import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const CustomHeaderBar = (props) => {
  const {statusBarHeight} = props;

  const _navigateBack = () => {
    const {navigation} = props;
    navigation.goBack();
  };

  return (
    <View style={styles.customHeader(statusBarHeight)}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={_navigateBack}>
          <Icon name="arrow_left" size={24} color="#3eaf7c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CustomHeaderBar.propTypes = {
  statusBarHeight: PropTypes.number, // 状态栏的高度
  isAnimate: PropTypes.bool, // 是否开启动画
  isFloat: PropTypes.bool, // 是否脱离文档流
  headerBarHeight: PropTypes.number, // 高度
  headerBarStyle: PropTypes.object, // 样式
  onPressLeftArea: PropTypes.func, // 点击左边区域的处理事件
  onPressTitleArea: PropTypes.func, // 点击标题的处理事件
  onPressRightArea: PropTypes.func, // 点击右边区域的处理事件
  renderLeftArea: PropTypes.elementType, // 渲染左边区域的元素
  renderTitleArea: PropTypes.elementType, // 渲染标题区域的元素
};

const styles = StyleSheet.create({
  customHeader: (statusBarHeight) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: statusBarHeight,
    zIndex: 100,
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
