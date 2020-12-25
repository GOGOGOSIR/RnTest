import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import CurstomTabBar from '../../../components/CurstomTabBar/CurstomTabBar';
import SearchContainer from './components/SearchContainer';
import Icon from '../../../components/Icon/Icon';
import VideoList from './components/VideoList';
import LiveList from './components/LiveList';
@CustomSafeAreaView()
class SwipeTabPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      requestParams: {},
    };
    this._renderTabBarFooterComponent = this._renderTabBarFooterComponent.bind(
      this,
    );
    this.goBack = this.goBack.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  _renderTabBarFooterComponent() {
    return (
      <View style={styles.searchWrapper}>
        <SearchContainer {...this.props} handleSearch={this.handleSearch} />
      </View>
    );
  }

  goBack() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  handleSearch({searchValue, cityCode, cityName}) {
    this.setState({
      requestParams: {
        cityCode,
        searchValue,
        cityName,
      },
    });
  }

  render() {
    const {requestParams} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.viewContainer}>
        <ScrollableTabView
          renderTabBar={() => (
            <CurstomTabBar
              tabBarContainerPaddingHorizontal={80}
              renderTabBarFooterComponent={this._renderTabBarFooterComponent}
            />
          )}>
          <LiveList
            tabLabel="直播看房"
            requestParams={requestParams}
            navigation={navigation}
          />
          <VideoList tabLabel="视频看房" requestParams={requestParams} />
        </ScrollableTabView>
        <TouchableOpacity style={styles.backBtn} onPress={this.goBack}>
          <Icon name="arrow_left" size={26} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default SwipeTabPage;
