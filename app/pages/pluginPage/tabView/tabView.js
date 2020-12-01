/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import CurstomTabBar from './components/curstomTabBar';
import TabList from './components/tabList';

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

export default class tabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.defaultTabList = tabList.slice(0, 3);
    this.curstomTabList = tabList.slice(0, 4);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.children = [];
  }
  handleChangeTab(data) {
    console.log(data);
  }
  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return (
      <TouchableOpacity
        key={name}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          flexShrink: 0,
        }}>
        <Text style={{color: isTabActive ? 'red' : '#333'}}>{name}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <>
        {/* <View style={styles.tabWrapper}>
          <View style={styles.titleWrapper}>
            <Text>DefaultTabBar</Text>
          </View>
          <ScrollableTabView
            locked={false}
            initialPage={1}
            prerenderingSiblingsNumber={2}
            renderTabBar={() => <DefaultTabBar />}
            onChangeTab={this.handleChangeTab}>
            {this.defaultTabList.map((tab) => {
              return <TabList key={tab} tabLabel={tab} />;
            })}
          </ScrollableTabView>
        </View> */}
        {/* <View style={styles.tabWrapper}>
          <View style={styles.titleWrapper}>
            <Text>ScrollableTabBar</Text>
          </View>
          <ScrollableTabView
            locked={false}
            initialPage={0}
            prerenderingSiblingsNumber={3}
            renderTabBar={() => <ScrollableTabBar />}
            tabBarUnderlineStyle={styles.tabLineStyle}
            style={styles.border}
            tabBarBackgroundColor="#3eaf7c"
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#333">
            {tabList.map((tab, i) => {
              return (
                <TabList
                  ref={(ref) => (this.children[i] = ref)}
                  key={tab}
                  tabLabel={tab}
                />
              );
            })}
          </ScrollableTabView>
        </View> */}
        <View style={styles.tabWrapper}>
          <View style={styles.titleWrapper}>
            <Text>ScrollableTabBar TabRender</Text>
          </View>
          <ScrollableTabView
            locked={false}
            initialPage={0}
            prerenderingSiblingsNumber={3}
            renderTabBar={() => (
              <ScrollableTabBar
                renderTab={this.renderTab}
                style={{
                  height: 40,
                  borderBottomWidth: 0,
                  backgroundColor: 'orange',
                }}
                underlineStyle={{
                  height: 0,
                }}
              />
            )}>
            {/* tabBarUnderlineStyle={styles.tabLineStyle} */}
            {tabList.map((tab, i) => {
              return (
                <TabList
                  ref={(ref) => (this.children[i] = ref)}
                  key={tab}
                  tabLabel={tab}
                />
              );
            })}
          </ScrollableTabView>
        </View>
        {/* <View style={styles.tabWrapper}>
          <View style={styles.titleWrapper}>
            <Text>CurstomTabBar</Text>
          </View>
          <ScrollableTabView
            locked={false}
            initialPage={0}
            prerenderingSiblingsNumber={3}
            renderTabBar={() => <CurstomTabBar />}>
            {this.curstomTabList.map((tab) => {
              return <TabList key={tab} tabLabel={tab} />;
            })}
          </ScrollableTabView>
        </View> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
  },
  tabWrapper: {
    flex: 1,
  },
  titleWrapper: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLineStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
});
