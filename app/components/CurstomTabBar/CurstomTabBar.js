/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

class CurstomTabBar extends PureComponent {
  static propTypes = {
    tabBarHeight: PropTypes.number, // tabBar的高度
    tabBarContainerPaddingHorizontal: PropTypes.number, // tabBar容器左右间距
    tabBarContainerStyle: PropTypes.object, // tabBar容器样式
    tabItemStyle: PropTypes.object, // tabBar每一项样式
    activeTextColor: PropTypes.string, // 选中时文案的颜色
    defaultTextColor: PropTypes.string, // 默认时文案的颜色
    showTabUnderline: PropTypes.bool, // 是否显示底部滑动条
    tabUnderlineWidth: PropTypes.number, // 底部滚动条的宽度
    tabUnderlineHeight: PropTypes.number, // 底部滚动条的高度
    tabUnderlineColor: PropTypes.string, // 底部滚动条的颜色
    renderTab: PropTypes.func, // 渲染tab
    renderTabBarFooterComponent: PropTypes.func, // 渲染tabBar底部的扩展
  };

  static defaultProps = {
    tabBarHeight: 44,
    tabBarContainerPaddingHorizontal: 0,
    tabBarContainerStyle: {},
    tabItemStyle: {},
    activeTextColor: '#000000',
    defaultTextColor: '#666666',
    showTabUnderline: true,
    tabUnderlineWidth: 40,
    tabUnderlineHeight: 3,
    tabUnderlineColor: '#FF9911',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderBottomSlideBar = this.renderBottomSlideBar.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  // 计算scaleX的interpolate
  getScaleXInterpolate (numberOfTabs) {
    const inputRange = [];
    const outputRange = [];
    for (let i = 0; i <= numberOfTabs - 1; i += 0.5) {
      const scaleXValue = i % 1 === 0 ? 1 : 1.5;
      inputRange.push(i);
      outputRange.push(scaleXValue);
    }

    return {
      inputRange,
      outputRange,
    };
  }

  // 渲染底部滚动条
  renderBottomSlideBar() {
    const {
      showTabUnderline,
      containerWidth,
      tabs,
      tabUnderlineWidth,
      tabBarContainerPaddingHorizontal,
      scrollValue,
    } = this.props;
    const numberOfTabs = tabs.length;
    const tabWidth = (containerWidth - tabBarContainerPaddingHorizontal * 2) / numberOfTabs;
    const offsetX = (tabWidth - tabUnderlineWidth) / 2;
    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWidth],
    });
    const scaleX = scrollValue.interpolate(this.getScaleXInterpolate(numberOfTabs));
    return showTabUnderline ? (
      <Animated.View
        style={[
          styles.tabUnderline(this.props, offsetX),
          {
            transform: [{ translateX }, { scaleX }],
          },
        ]}
      />
    ) : null;
  }

  renderItem(name, page, isActive, goToPage) {
    const {
      tabBarHeight,
      tabItemStyle,
      activeTextColor,
      defaultTextColor,
    } = this.props;

    return (
      <TouchableOpacity
        key={name}
        onPress={() => {
          goToPage(page);
        }}
        style={[styles.tabItem(tabBarHeight), tabItemStyle]}
      >
        <Text
          style={styles.tabBarText(isActive, activeTextColor, defaultTextColor)}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      tabBarContainerStyle,
      tabBarContainerPaddingHorizontal,
      tabs,
      activeTab,
      goToPage,
      renderTab,
      renderTabBarFooterComponent,
    } = this.props;

    return (
      <View style={styles.curtomTabBarContainer}>
        <View
          style={[
            styles.tabBarWrapper(tabBarContainerPaddingHorizontal),
            tabBarContainerStyle,
          ]}
        >
          {tabs.map((name, page) => {
            const isActive = activeTab === page;
            const renderItem = renderTab || this.renderItem;
            return renderItem(name, page, isActive, goToPage);
          })}
          {this.renderBottomSlideBar()}
        </View>
        {renderTabBarFooterComponent ? renderTabBarFooterComponent() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  curtomTabBarContainer: {
    backgroundColor: '#fff',
  },
  tabBarWrapper: (tabBarContainerPaddingHorizontal) => ({
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: tabBarContainerPaddingHorizontal,
  }),
  tabItem: (tabBarHeight) => ({
    flex: 1,
    height: tabBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  tabBarText: (isActive, activeTextColor, defaultTextColor) => ({
    color: isActive ? activeTextColor : defaultTextColor,
    fontWeight: '600',
    fontSize: 17,
  }),
  tabUnderline: (
    {
      tabUnderlineWidth,
      tabUnderlineHeight,
      tabUnderlineColor,
      tabBarContainerPaddingHorizontal,
    },
    offsetX,
  ) => ({
    position: 'absolute',
    width: tabUnderlineWidth,
    height: tabUnderlineHeight,
    borderRadius: tabUnderlineHeight / 2,
    backgroundColor: tabUnderlineColor,
    bottom: 0,
    marginLeft: offsetX + tabBarContainerPaddingHorizontal,
  }),
});

export default CurstomTabBar;
