/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import {
  View, SafeAreaView, StyleSheet, TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CurstomTabBar from '../../../components/CurstomTabBar/CurstomTabBar';
import LiveSmallScreen from '../../../components/Live/LiveSmallScreen';
import SearchContainer from './components/SearchContainer';
import Icon from '../../../components/Icon/index';
import VideoList from './components/VideoList';
import LiveList from './components/LiveList';

class LiveAggregation extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      requestParams: {},
      liveUrl: '',
    };
    this._renderTabBarFooterComponent = this._renderTabBarFooterComponent.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateLiveUrl = this.updateLiveUrl.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  _renderTabBarFooterComponent () {
    return (
      <View style={styles.searchWrapper}>
        <SearchContainer {...this.props} handleSearch={this.handleSearch} />
      </View>
    );
  }

  goBack () {
    const { navigation } = this.props;
    navigation.goBack();
  }

  handleSearch ({ searchValue, cityCode, cityName }) {
    this.setState({
      requestParams: {
        cityCode,
        searchValue,
        cityName,
      },
    });
  }

  updateLiveUrl(liveUrl) {
    this.setState({
      liveUrl,
    });
  }

  handleChangeTab() {
    // tab切换的时候关闭直播小弹窗
    this.setState({
      liveUrl: '',
    });
  }

  render() {
    const { requestParams, liveUrl } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaViewWrapper}>
        <View style={styles.viewContainer}>
          <ScrollableTabView
            renderTabBar={() => (
              <CurstomTabBar
                tabBarContainerPaddingHorizontal={80}
                renderTabBarFooterComponent={this._renderTabBarFooterComponent}
              />
            )}
            onChangeTab={this.handleChangeTab}
          >
            <LiveList tabLabel="直播看房" requestParams={requestParams} navigation={navigation} updateLiveUrl={this.updateLiveUrl} />
            <VideoList tabLabel="视频看房" requestParams={requestParams} />
          </ScrollableTabView>
          <TouchableOpacity style={styles.backBtn} onPress={this.goBack}>
            <Icon name="zuojiantou" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
        {/* 直播小窗 */}
        { liveUrl ? <LiveSmallScreen navigation={navigation} liveUrl={liveUrl} /> : null }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaViewWrapper: {
    flex: 1,
    position: 'relative',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F9',
  },
  searchWrapper: {
    paddingVertical: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 11,
  },
});

export default LiveAggregation;
