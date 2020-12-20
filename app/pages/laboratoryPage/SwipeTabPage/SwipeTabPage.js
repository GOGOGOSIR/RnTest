/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
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
    this.state = {};
    this._renderTabBarFooterComponent();
  }

  _renderTabBarFooterComponent() {
    return (
      <View style={styles.searchWrapper}>
        <SearchContainer />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableTabView
          renderTabBar={() => (
            <CurstomTabBar
              tabBarContainerPaddingHorizontal={80}
              renderTabBarFooterComponent={this._renderTabBarFooterComponent}
            />
          )}>
          <LiveList tabLabel="直播看房" />
          <VideoList tabLabel="视频看房" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingVertical: 10,
  },
});
export default SwipeTabPage;
