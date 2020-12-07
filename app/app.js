import React, {PureComponent} from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import AppNavigation from './utils/createNavigation/index';
import RNBootSplash from 'react-native-bootsplash';
export default class Txclass extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleAndroidBack,
      );
    }
    RNBootSplash.hide({fade: true});
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backHandler && this.backHandler.remove();
    }
  }

  handleAndroidBack() {
    if (this.lastBackPressed && this.lastBackPressed + 2000 > Date.now()) {
      BackHandler.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再点一次退出', ToastAndroid.SHORT);
    return true;
  }

  render() {
    return <AppNavigation />;
  }
}
