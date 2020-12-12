import React, {PureComponent} from 'react';
import {BackHandler, Platform, ToastAndroid, Dimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import AppNavigation from './utils/createNavigation/index';
import RNBootSplash from 'react-native-bootsplash';
import {setAsyncStorage} from './utils/storage/index';
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
    // 锁住屏幕方向
    Orientation.lockToPortrait();
    this.initStorage();
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backHandler && this.backHandler.remove();
    }
  }

  // 存储一些常用值
  initStorage() {
    const systemInfo = Dimensions.get('window');
    setAsyncStorage('@systemInfo', systemInfo);
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
