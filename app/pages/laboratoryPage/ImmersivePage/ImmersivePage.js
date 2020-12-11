import React, {PureComponent} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CustomHeaderBar from '../../../components/CustomHeaderBar/CustomHeaderBar';

class ImmersivePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bgImageWrapperHeight: 0,
      offsetTop: 0,
    };
    this.bgImage = require('../../../assets/image/pic/doam.jpg');
    this._imageBackgroundLayout = this._imageBackgroundLayout.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  // 获取背景区域的一些信息
  _imageBackgroundLayout(e) {
    this.setState({
      bgImageWrapperHeight: e.nativeEvent.layout.height,
    });
  }

  // 监听列表滚动
  handleScroll(e) {
    const scrolledY = Math.max(0, e.nativeEvent.contentOffset.y);
    const {bgImageWrapperHeight} = this.state;
    this.setState({
      offsetTop: -scrolledY,
    });
    console.log(scrolledY);
  }

  render() {
    const {statusBarHeight, platform, ...othersProps} = this.props;
    const {bgImageWrapperHeight} = this.state;
    const paddingTop =
      platform === 'ios'
        ? bgImageWrapperHeight - statusBarHeight
        : bgImageWrapperHeight;
    const mockList = [1, 2, 3, 4, 5];
    console.log('render');
    return (
      <View>
        {/* 背景区域 */}
        <View
          style={[
            styles.bgImageWrapper(platform, statusBarHeight),
            {marginTop: this.state.offsetTop},
          ]}
          onLayout={this._imageBackgroundLayout}>
          <ImageBackground source={this.bgImage} style={styles.bgImage}>
            <Text style={styles.bgImageText}>
              该图片仅供学习使用，切勿用作商业活动
            </Text>
          </ImageBackground>
        </View>
        {/* 自定义headerBar */}
        <CustomHeaderBar
          platform={platform}
          statusBarHeight={statusBarHeight}
          {...othersProps}
        />
        {/* 滚动区域 */}
        <ScrollView
          onScroll={this.handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          <View
            style={[
              styles.mockList,
              {
                paddingTop,
              },
            ]}>
            {mockList.map((i) => (
              <View key={i} style={styles.mockListItem} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImageWrapper: (platform, statusBarHeight) => ({
    position: 'absolute',
    top: platform === 'android' ? 0 : -statusBarHeight,
    left: 0,
    right: 0,
    height: 480,
    zIndex: 10,
  }),
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
  },
  bgImageText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  mockList: {
    paddingHorizontal: 20,
  },
  mockListItem: {
    height: 80,
    backgroundColor: '#eee',
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default CustomSafeAreaView(
  {
    autofillStatusBar: false,
  },
  {
    barStyle: 'light-content',
    backgroundColor: 'rgba(0,0,0,0)',
  },
)(ImmersivePage);
