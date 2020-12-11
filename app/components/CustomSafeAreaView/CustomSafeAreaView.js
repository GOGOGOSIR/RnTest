import React, {PureComponent} from 'react';
import {
  Platform,
  StatusBar,
  NativeModules,
  SafeAreaView,
  View,
} from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
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
      if (Platform.OS === 'android' && translucent && autofillStatusBar) {
        return {
          paddingTop: statusBarHeight,
        };
      }
      return null;
    }

    render() {
      const {statusBarHeight} = this.state;
      const immersiveStyle = this._immersiveStyle();
      const {safeAreaViewStyle} = this.options;
      console.log('safe render');
      return (
        <SafeAreaView
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
