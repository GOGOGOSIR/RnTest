import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
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
    this._renderBottomSlideBar = this._renderBottomSlideBar.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  // 渲染底部滚动条
  _renderBottomSlideBar() {
    const {
      showTabUnderline,
      containerWidth,
      tabs,
      tabUnderlineWidth,
      tabBarContainerPaddingHorizontal,
    } = this.props;
    const numberOfTabs = tabs.length;
    const tabWidth =
      (containerWidth - tabBarContainerPaddingHorizontal * 2) / numberOfTabs;
    const offsetX = (tabWidth - tabUnderlineWidth) / 2;
    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWidth],
    });
    const scaleX = this.props.scrollValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.5, 1],
    });
    return showTabUnderline ? (
      <Animated.View
        style={[
          styles.tabUnderline(this.props, offsetX),
          {
            transform: [{translateX}, {scaleX}],
          },
        ]}
      />
    ) : null;
  }

  _renderItem(name, page, isActive, goToPage) {
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
          console.log(goToPage, 'goToPage=====');
          goToPage(page);
        }}
        style={[styles.tabItem(tabBarHeight), tabItemStyle]}>
        <Text
          style={styles.tabBarText(
            isActive,
            activeTextColor,
            defaultTextColor,
          )}>
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
          ]}>
          {tabs.map((name, page) => {
            const isActive = activeTab === page;
            const renderItem = renderTab ? renderTab : this._renderItem;
            return renderItem(name, page, isActive, goToPage);
          })}
          {this._renderBottomSlideBar()}
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
  tabBarText: (isActive, activeTextColor, defaultTextColor) => {
    return {
      color: isActive ? activeTextColor : defaultTextColor,
      fontWeight: '600',
      fontSize: 17,
    };
  },
  tabUnderline: (
    {
      tabUnderlineWidth,
      tabUnderlineHeight,
      tabUnderlineColor,
      tabBarContainerPaddingHorizontal,
    },
    offsetX,
  ) => {
    return {
      position: 'absolute',
      width: tabUnderlineWidth,
      height: tabUnderlineHeight,
      borderRadius: tabUnderlineHeight / 2,
      backgroundColor: tabUnderlineColor,
      bottom: 0,
      marginLeft: offsetX + tabBarContainerPaddingHorizontal,
    };
  },
});

export default CurstomTabBar;
