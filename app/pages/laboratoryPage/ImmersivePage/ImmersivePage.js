import React, {PureComponent} from 'react';
import {View, Text, ImageBackground, StyleSheet, Animated} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import AnimateHeaderBar from './AnimateHeaderBar';

const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mockTabList = [1, 2, 3, 4];
const HeaderBarHeight = 50;
const fadeBarHeight = 30;
let isHide = false;

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
    this.handleAnimated = this.handleAnimated.bind(this);
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
      <View>
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
          ref={(ref) => (this.tabNav = ref)}
          style={[styles.tabList]}>
          {mockTabList.map((i) => (
            <View key={i} style={styles.tabListItem} />
          ))}
        </Animated.View>
      </View>
    );
  }

  // 处理动画
  handleAnimated(e) {
    const scrolledY = e.nativeEvent.contentOffset.y;
    const {bgImageWrapperHeight} = this.state;
    const {statusBarHeight} = this.props;
    const targetOffestY =
      bgImageWrapperHeight - statusBarHeight - HeaderBarHeight - fadeBarHeight;
    if (scrolledY >= targetOffestY && !isHide) {
      console.log('hide');
      this.tabNav.setNativeProps({
        style: {
          opacity: 0,
        },
      });
      this.stickTabList.setNativeProps({
        style: {
          opacity: 1,
        },
      });
      isHide = true;
    } else if (scrolledY < targetOffestY && isHide) {
      console.log('show');
      this.tabNav.setNativeProps({
        style: {
          opacity: 1,
        },
      });
      this.stickTabList.setNativeProps({
        style: {
          opacity: 0,
        },
      });
      isHide = false;
    }
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
    const {scrolledY, bgImageWrapperHeight} = this.state;
    const stickOffsetTop = bgImageWrapperHeight
      ? scrolledY.interpolate({
          inputRange: [
            0,
            bgImageWrapperHeight -
              statusBarHeight -
              HeaderBarHeight -
              fadeBarHeight,
          ],
          outputRange: [0, statusBarHeight + HeaderBarHeight + fadeBarHeight],
          extrapolate: 'clamp',
        })
      : 0;
    console.log('render');
    return (
      <>
        {/* 自定义头部 */}
        <AnimateHeaderBar
          scrolledY={scrolledY}
          statusBarHeight={statusBarHeight}
          {...othersProps}
        />
        {/* fadeBar部分 */}
        <Animated.View
          style={[
            styles.fadeBarWrapper,
            {
              top: scrolledY.interpolate({
                inputRange: [0, statusBarHeight + HeaderBarHeight],
                outputRange: [0, statusBarHeight + HeaderBarHeight],
                extrapolate: 'clamp',
              }),
              opacity: scrolledY.interpolate({
                inputRange: [
                  statusBarHeight + HeaderBarHeight / 2,
                  statusBarHeight + HeaderBarHeight,
                ],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}>
          <Text style={styles.fadeBarText}>我是fadeBar的内容</Text>
        </Animated.View>
        {/* tab吸顶部分 */}
        <Animated.View
          ref={(ref) => (this.stickTabList = ref)}
          style={[
            styles.stickTabList,
            {
              top: stickOffsetTop,
            },
          ]}>
          {mockTabList.map((i) => (
            <View key={i} style={styles.tabListItem} />
          ))}
        </Animated.View>
        <Animated.FlatList
          data={mockList}
          // 由于ListHeaderComponent渲染后的层级永远在renderItem之下，即使设置zIndex也不好使
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
              listener: this.handleAnimated,
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
  headerWrapper: {
    position: 'relative',
    zIndex: -10,
  },
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
  fadeBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: fadeBarHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    zIndex: 10,
  },
  stickTabList: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3eaf7c',
    zIndex: 10,
    opacity: 0,
  },
  fadeBarText: {
    fontSize: 14,
    color: '#fff',
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
