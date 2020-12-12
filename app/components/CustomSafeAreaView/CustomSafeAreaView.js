/**
 * react-navigation 当有header和tabBar的时候 ios 会自动填充安全区域
 * 否则，就要手动设置ios的安全区域，
 * 这里有两个选择react-native-safe-area-context和 react-native自带的
 * 不选择后者的原因：
 *  为了在iOS上做出沉浸式的效果，要求式上面的安全区域不要默认填充，可通过配置项配置是否填充，所以后者不适合, 而且前者支持android的安全区域的适配
 * 选择react-native-safe-area-context需要注意
 *  他默认四个方向都会填充，这样会导致，在有tabbar的页面会重复填充底部的安全区域，所以要把这个安全区域的底部隐藏掉
 * 对于android来说当设置了translucent为true时，会出现沉浸式的效果，即statusbar的填充的高度会消失
 * 此时：
 * ios和android的效果达到了统一，可以灵活的配置页面的基础效果
 */
import React, {PureComponent} from 'react';
import {Platform, StatusBar, NativeModules} from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../styles/commonStyles';

const {StatusBarManager} = NativeModules;
const DEFAULT_STATUS_BAR_CONFIG = {
  barStyle: 'dark-content',
  backgroundColor: '#fff',
  translucent: true,
};
const DEFAULT_OPTIONS = {
  autofillStatusBar: true,
  safeAreaViewStyle: {},
};

const CustomSafeAreaView = (
  options = DEFAULT_OPTIONS,
  statusbarProps = DEFAULT_STATUS_BAR_CONFIG,
) => (WrappedComponent) => {
  class Component extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        statusBarHeight: 0,
      };
      this.statusbarProps = {
        ...DEFAULT_STATUS_BAR_CONFIG,
        ...statusbarProps,
      };
      this.options = {
        ...DEFAULT_OPTIONS,
        ...options,
      };
    }

    componentDidMount() {
      this._navListener = this.props.navigation.addListener(
        'focus',
        this._setStatusBar,
      );
      this._getStatusBarHeight();
    }

    componentWillUnmount() {
      this._navListener();
    }

    _setStatusBar = () => {
      const {barStyle, backgroundColor, translucent} = this.statusbarProps;
      StatusBar.setBarStyle(barStyle);
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(translucent);
        StatusBar.setBackgroundColor(backgroundColor);
      }
    };

    _getStatusBarHeight() {
      if (Platform.OS === 'ios') {
        StatusBarManager.getHeight(({height}) => {
          this.setState({
            statusBarHeight: height,
          });
        });
      } else {
        this.setState({
          statusBarHeight: StatusBar.currentHeight,
        });
      }
    }

    // android 沉浸式的样式
    _immersiveStyle() {
      const {translucent} = this.statusbarProps;
      const {autofillStatusBar} = this.options;
      const {statusBarHeight} = this.state;
      if (translucent && autofillStatusBar) {
        return {
          paddingTop: statusBarHeight,
        };
      }
      return null;
    }

    render() {
      const {statusBarHeight} = this.state;
      const {route} = this.props;
      const immersiveStyle = this._immersiveStyle();
      const {safeAreaViewStyle} = this.options;
      let edges = ['right', 'bottom', 'left'];
      // fix: react-navigation 有tabBar时，ios它会默认填充底部的安全区域，所以SafeAreaView不需要设置底部区域的填充
      if (route.params && route.params.isBottomTabNavigator) {
        edges = ['right', 'left'];
      }
      console.log('safe render', route, this.props.navigation);
      return (
        <SafeAreaView
          edges={edges}
          style={[
            commonStyles.safeAreaView,
            immersiveStyle,
            safeAreaViewStyle,
          ]}>
          <WrappedComponent
            statusBarHeight={statusBarHeight}
            platform={Platform.OS}
            {...this.props}
          />
        </SafeAreaView>
      );
    }
  }

  return hoistNonReactStatics(Component, WrappedComponent);
};

export default CustomSafeAreaView;
