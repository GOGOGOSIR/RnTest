/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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
    this.defaultTabList = tabList.slice(0, 3);
    this.curstomTabList = tabList.slice(0, 4);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.children = [];
    this.configList = [
      // {
      //   title: 'DefaultTabBar',
      //   tabProps: {
      //     locked: false,
      //     initialPage: 0,
      //     prerenderingSiblingsNumber: 2,
      //     renderTabBar: () => <DefaultTabBar />,
      //     onChangeTab: this.handleChangeTab,
      //     renderItem: this.defaultTabList.map((tab) => {
      //       return <TabList key={tab} tabLabel={tab} />;
      //     }),
      //   },
      // },
      // {
      //   title: 'ScrollableTabBar',
      //   locked: false,
      //   initialPage: 1,
      //   prerenderingSiblingsNumber: 2,
      //   renderTabBar: () => <ScrollableTabBar />,
      //   tabBarUnderlineStyle: styles.tabLineStyle,
      //   style: styles.border,
      //   tabBarBackgroundColor: '#3eaf7c',
      //   tabBarActiveTextColor: '#fff',
      //   tabBarInactiveTextColor: '#333',
      //   renderChild: () =>
      //     tabList.map((tab, i) => {
      //       return (
      //         <TabList
      //           ref={(ref) => (this.children[i] = ref)}
      //           key={tab}
      //           tabLabel={tab}
      //         />
      //       );
      //     }),
      // },
      {
        title: 'ScrollableTabBar TabRender',
        tabProps: {
          locked: false,
          initialPage: 0,
          prerenderingSiblingsNumber: 2,
          renderTabBar: () => (
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
          ),
          renderChild: () =>
            tabList.map((tab, i) => {
              return (
                <TabList
                  ref={(ref) => (this.children[i] = ref)}
                  key={tab}
                  tabLabel={tab}
                />
              );
            }),
        },
      },
      // {
      //   title: 'CurstomTabBar',
      //   tabProps: {
      //     locked: false,
      //     initialPage: 0,
      //     prerenderingSiblingsNumber: 2,
      //     renderTabBar: () => <CurstomTabBar />,
      //     renderChild: () =>
      //       this.curstomTabList.map((tab) => {
      //         return <TabList key={tab} tabLabel={tab} />;
      //       }),
      //   },
      // },
    ];
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
        <Text style={{color: isTabActive ? '#fff' : '#333'}}>{name}</Text>
      </TouchableOpacity>
    );
  }
  renderItem({item}) {
    console.log(item.tabProps);
    const {
      title,
      tabProps: {renderChild, ...othersProps},
    } = item;

    return (
      <View style={styles.tabWrapper}>
        <View style={styles.titleWrapper}>
          <Text>{title}</Text>
        </View>
        <ScrollableTabView {...othersProps}>
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
    );
  }
  render() {
    return (
      <FlatList
        style={styles.scrollViewWrapper}
        data={this.configList}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.title}
      />
    );
  }
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabWrapper: {
    height: 500,
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
    marginBottom: 20,
  },
});
