/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import TabList from './components/tabList';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';

const tabList = [
  'java',
  'js',
  'jquery',
  'python',
  'go',
  'ruby',
  'php',
  'flutter',
  'dart',
  'android',
  'ios',
];
@CustomSafeAreaView()
class tabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollableTabView
        locked={false}
        initialPage={0}
        prerenderingSiblingsNumber={0}
        renderTabBar={() => (
          <ScrollableTabBar
            style={{
              height: 40,
              borderBottomWidth: 0,
            }}
            tabStyle={{
              height: 40,
            }}
          />
        )}
        tabBarUnderlineStyle={styles.tabLineStyle}
        style={styles.border}
        tabBarBackgroundColor="#3eaf7c"
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#333">
        {tabList.map((tab, i) => {
          return <TabList key={tab} tabLabel={tab} />;
        })}
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabLineStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
});

export default tabView;
