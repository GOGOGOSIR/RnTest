/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import Icon from '../../../components/Icon/Icon';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CurstomTabBar from './component/CurstomTabBar';
import VideoList from './component/VideoList';
import LiveList from './component/LiveList';
import SearchContainer from './component/SearchContainer';
@CustomSafeAreaView({
  safeAreaViewStyle: {
    backgroundColor: '#F5F5F9',
  },
})
class SwipeTabPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requestParams: {},
    };
    this._renderTabBarFooterComponent = this._renderTabBarFooterComponent.bind(
      this,
    );
    this.handleChange = this.handleChange.bind(this);
  }

  _renderTabBarFooterComponent() {
    return (
      <View style={styles.searchWrapper}>
        <SearchContainer handleChange={this.handleChange} />
      </View>
    );
  }

  handleChange(data) {
    console.log(data, 'seach');
    this.setState({
      requestParams: {
        searchValue: data,
      },
    });
  }

  render() {
    const {requestParams} = this.state;
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <ScrollableTabView
          renderTabBar={() => (
            <CurstomTabBar
              tabBarContainerPaddingHorizontal={80}
              renderTabBarFooterComponent={this._renderTabBarFooterComponent}
            />
          )}>
          <LiveList tabLabel="直播看房" requestParams={requestParams} />
          <VideoList tabLabel="视频看房" requestParams={requestParams} />
        </ScrollableTabView>
        <TouchableOpacity style={styles.backBtn} onPress={this._goBack}>
          <Icon name="arrow_left" size={27} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingVertical: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 15,
    top: 8,
  },
});
export default SwipeTabPage;
