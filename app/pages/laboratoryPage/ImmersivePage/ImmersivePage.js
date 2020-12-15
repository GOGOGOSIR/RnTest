import React, {PureComponent} from 'react';
import {View, Text, ImageBackground, StyleSheet, Animated} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import AnimateHeaderBar from './AnimateHeaderBar';

const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mockTabList = [1, 2, 3, 4];

class ImmersivePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bgImageWrapperHeight: 0,
      scrolledY: new Animated.Value(0),
    };
    this.bgImage = require('../../../assets/image/pic/doam.jpg');
    this._renderItem = this._renderItem.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this.handleLayout = this.handleLayout.bind(this);
  }

  _renderItem() {
    return (
      <View>
        {/* list item */}
        <View style={styles.mockList}>
          <View style={styles.mockListItem} />
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <>
        {/* 广告背景图 */}
        <ImageBackground
          source={this.bgImage}
          style={styles.bgImage}
          onLayout={this.handleLayout}>
          <Text style={styles.bgImageText}>
            该图片仅供学习使用，切勿用作商业活动
          </Text>
        </ImageBackground>
        {/* mock tab list */}
        <Animated.View
          style={[
            styles.tabList,
            {
              transform: [
                {
                  translateY: this.state.scrolledY.interpolate({
                    inputRange: [
                      this.state.bgImageWrapperHeight,
                      this.state.bgImageWrapperHeight + 1,
                    ],
                    outputRange: [0, 100],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          {mockTabList.map((i) => (
            <View key={i} style={styles.tabListItem} />
          ))}
        </Animated.View>
      </>
    );
  }

  handleLayout(e) {
    // 获取背景图的高度
    const height = e.nativeEvent.layout.height;
    this.setState({
      bgImageWrapperHeight: height,
    });
  }

  render() {
    const {statusBarHeight, ...othersProps} = this.props;
    const {scrolledY} = this.state;

    console.log('render');
    return (
      <>
        {/* 自定义头部 */}
        <AnimateHeaderBar
          scrolledY={scrolledY}
          statusBarHeight={statusBarHeight}
          {...othersProps}
        />
        <Animated.FlatList
          data={mockList}
          ListHeaderComponent={this._renderHeader}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.toString()}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrolledY,
                  },
                },
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    height: 480,
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
    paddingHorizontal: 15,
  },
  mockListItem: {
    height: 80,
    backgroundColor: '#eee',
    marginVertical: 10,
    borderRadius: 10,
  },
  tabList: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3eaf7c',
  },
  tabListItem: {
    height: 40,
    width: 90,
    backgroundColor: '#fff',
    borderRadius: 5,
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
