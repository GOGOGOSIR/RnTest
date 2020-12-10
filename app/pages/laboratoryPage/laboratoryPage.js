import React, {PureComponent} from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  NativeModules,
  View,
  StyleSheet,
} from 'react-native';
import commonStyles from '../../styles/commonStyles';

const {StatusBarManager} = NativeModules;
export default class laboratoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {statusBarHeight: 0};
  }
  componentDidMount() {
    this.initStatusBar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statusBarHeight !== this.state.statusBarHeight) {
      console.log('componentDidUpdate', this.state.statusBarHeight);
    }
  }

  initStatusBar() {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(({height}) => {
        this.setState({
          statusBarHeight: height,
        });
      });
    } else {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      this.setState({
        statusBarHeight: StatusBar.currentHeight,
      });
    }
  }

  render() {
    console.log('render');
    return (
      <ImageBackground
        source={require('../../assets/image/swiper/1.jpg')}
        style={[styles.image]}>
        <SafeAreaView
          style={[commonStyles.safeAreaView, {backgroundColor: 'transparent'}]}>
          <View>
            <ScrollView style={{marginTop: 0}}>
              <Text>12345645645</Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    height: 400,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
